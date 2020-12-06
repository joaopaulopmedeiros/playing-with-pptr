const puppeteer = require("puppeteer");
const path = require("path");

const bot = {
  url: "",
  setUrl(url) {
    this.url = url;
  },
  getUrl() {
    return this.url;
  },
};

const attack = (url) => {
  bot.setUrl(url);
};

const click = async (node, totalIterations) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 728,
    deviceScaleFactor: 1,
  });

  await page.goto(bot.getUrl());

  for (let i = 0; i < totalIterations; i++) {
    await page.click(node);

    await page.screenshot({
      path: path.resolve("assets", "img", `example${i+1}.png`),
    });
  }

  await browser.close();
};

exports.click = click;
exports.attack = attack;
