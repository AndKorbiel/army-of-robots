const puppeteer = require("puppeteer");

async function scrape(pages, names, selectors) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  let resp = [];

  for (let i = 0; i < pages.length; i++) {
    await page.goto(pages[i]);

    const element = await page.waitForSelector(selectors[i]);
    const text = await page.evaluate((element) => element.textContent, element);
    resp.push(`${names[i]}: ${text}`);
  }
  (await browser).close();
  return resp;
}

const data = scrape(
  [
    "https://www.e-zegarki.pl/zegarek-meski-tommy-hilfiger-baker-1710450",
    "https://montres.pl/zegarek/zegarek-meski-tommy-hilfiger-1710450",
    "https://www.swiss.com.pl/pl/zegarek/1710450",
    "https://www.otozegarki.pl/1710450-zegarek-meski-tommy-hilfiger-baker-th1710450",
    "https://www.zegarek.net/zegarki-tommy-hilfiger/zegarek-1710450",
  ],
  ["E-zegarki", "Montres.pl", "Swiss.com", "Otozegarki.pl", "Zegarek.net"],
  [
    ".price",
    ".price",
    "[itemprop='price']",
    "[itemprop='price']",
    "[data-product_cart_info_controller-target='finalPrice']",
  ]
);

module.exports = data;
