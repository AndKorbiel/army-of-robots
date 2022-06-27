const puppeteer = require("puppeteer");

async function scrape(pages, names, selectors) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  let resp = [];

  for (let i = 0; i < pages.length; i++) {
    await page.goto(pages[i], { waitUntil: "networkidle2" });

    const element = await page.waitForSelector(selectors[i], {
      timeout: 50000,
    });
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
    "https://www.ekopark.pl/nowa-lipska/mieszkania/#area[]=46&area[]=82&floor[]=0&floor[]=5&inv=25&rooms[]=2&rooms[]=4&type=a",
  ],
  [
    "E-zegarki",
    "Montres.pl",
    "Swiss.com",
    "Otozegarki.pl",
    "Zegarek.net",
    "Nowa Lipska",
  ],
  [
    ".price",
    ".price",
    "[itemprop='price']",
    "[itemprop='price']",
    "[data-product_cart_info_controller-target='finalPrice']",
    ".estate-grid__header h2",
  ]
);

module.exports = data;
