const fs = require("fs");
const fse = require("fs-extra");
const https = require("https");
const { length } = require("ramda");
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
    const path = destination;
    try {
      await existsAsync(path);
      resolve();
    } catch (e) {
      await fse.ensureFile(destination);
      const file = fs.createWriteStream(path);
      https
        .get(url, (response) => {
          response.pipe(file);

          file.on("finish", () => {
            file.close(resolve(true));
          });
        })
        .on("error", (error) => {
          fs.unlinkSync(path);
          reject(error.message);
        });
    }
  });

async function downloadAllImagesFromUrl(page, selector, folder, batchSize = 3) {
  await createFolderStructure(folder);
  const images = await page.$$eval(selector, (imgs) =>
    imgs.map((img) => img.currentSrc)
  );
  const imagesSize = length(images);
  for (let i = 0; i < imagesSize; i += batchSize) {
    if (!images[i]) return;
    const promises = [];
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
    const data = await allSettled(promises);
    console.log(data);
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
