import puppeteer from "puppeteer";
import { data } from "./data.js";

async function scrape(givenData) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  let resp = [];

  for (let i = 0; i < givenData.length; i++) {
    const { src, title, selector } = givenData[i];

    await page.goto(src, { waitUntil: "networkidle2" });

    const element = await page.waitForSelector(selector, {
      timeout: 50000,
    });
    const text = await page.evaluate((element) => element.textContent, element);
    resp.push(`${title}: ${text}`);
  }

  (await browser).close();
  return resp;
}

export const scrapedData = scrape(data);
