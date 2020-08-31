const fs = require("fs");
const fse = require("fs-extra");
const https = require("https");
const { length, compose, filter, propEq } = require("ramda");
const allSettled = require("promise.allsettled");

const existsAsync = (path) =>
  new Promise((resolve, reject) => {
    fs.access(path, (err) => (err ? reject(err) : resolve()));
  });
async function launchNewPage(browser, pageUrl) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (
      ["image", "stylesheet", "font", "script"].indexOf(
        request.resourceType()
      ) !== -1
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });
  await page.goto(pageUrl);
  return page;
}
function getLinksFromSelector(page, selector) {
  return page.$$eval(selector, (as) => as.map((a) => a.href).reverse());
}
const createFolderStructure = (path) =>
  fse.ensureDir(`${process.cwd()}/comics/${path}`);

const downloadImage = (url, destination) =>
  new Promise(async (resolve, reject) => {
    try {
      await existsAsync(destination);
      resolve();
    } catch (e) {
      await fse.ensureFile(destination);
      const file = fs.createWriteStream(destination);
      https
        .get(url, (response) => {
          response.pipe(file);

          file.on("finish", () => {
            file.close();
            resolve(true);
            console.log({ url, destination });
          });
        })
        .on("error", () => {
          fs.unlinkSync(destination);
          reject({ url, destination });
        });
    }
  });
const getRejected = compose(filter(propEq("status", "rejected")));
async function downloadAllImagesFromUrl(page, selector, folder, batchSize = 3) {
  await createFolderStructure(folder);
  const images = await page.$$eval(selector, (imgs) =>
    imgs.map((img) => img.currentSrc)
  );
  const imagesSize = length(images);
  let promises = [];
  for (let i = 0; i < imagesSize; i += batchSize) {
    if (!images[i]) return;
    for (let j = 0; j < batchSize; j += 1) {
      if (!images[i + j]) continue;
      promises.push(
        downloadImage(
          images[i + j],
          `comics/${folder}/page${padNumber(
            i + j + 1,
            `${imagesSize}`.length
          )}.jpeg`
        )
      );
    }
    const failedPromises = getRejected(await allSettled(promises));
    promises = [];
    failedPromises.forEach((p) =>
      promises.push(downloadImage(p.url, p.destination))
    );
  }
}
function padNumber(number, width = 3, separator = "0") {
  const n = number.toString();
  return n.length >= width
    ? n
    : new Array(width - n.length + 1).join(separator) + n;
}

module.exports = {
  padNumber,
  launchNewPage,
  getLinksFromSelector,
  downloadImage,
  createFolderStructure,
  downloadAllImagesFromUrl,
};
