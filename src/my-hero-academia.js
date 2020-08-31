const helpers = require("./helpers");
async function downloadAllComics(browser) {
  try {
    const page = await helpers.launchNewPage(
      browser,
      "https://onepunchmanmangaonline.com/"
    );
    const data = await helpers.getLinksFromSelector(page, ".su-posts a");
    for (let i = 0; i < data.length; i++) {
      const url = data[i];
      await page.goto(url);
      await helpers.downloadAllImagesFromUrl(
        page,
        ".entry-content img",
        `my-hero-no-academia/chapter${helpers.padNumber(
          i + 1,
          `${data.length}`.length
        )}`,
        15
      );
    }
  } catch (e) {
    console.log(e);
  }
}
