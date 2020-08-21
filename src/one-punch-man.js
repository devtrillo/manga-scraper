const helpers = require("./helpers");
async function downloadAllComics(browser) {
  try {
    const page = await helpers.launchNewPage(
      browser,
      "https://onepunchmanmangaonline.com/"
    );
    const data = await helpers.getLinksFromSelector(
      page,
      "#ceo_latest_comics_widget-3 li a"
    );
    for (let i = 0; i < data.length; i++) {
      const url = data[i];
      await page.goto(url);
      await helpers.downloadAllImagesFromUrl(
        page,
        ".entry-inner img",
        `one-punch-man/chapter${helpers.padNumber(
          i + 1,
          `${data.length}`.length
        )}`
      );
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = downloadAllComics;
