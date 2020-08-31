const onePunchMan = require("./src/one-punch-man");
const myHeroNoAcademia = require("./src/my-hero-academia");
const helpers = require("./src/helpers");
const puppeteer = require("puppeteer");

const downloadAllComics = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const res = await Promise.all([
    onePunchMan(browser),
    myHeroNoAcademia(browser),
  ]);
  await browser.close();
  return res;
};

downloadAllComics().then(console.log).catch(console.error);
