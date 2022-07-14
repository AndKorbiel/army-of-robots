import puppeteer from "puppeteer";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

const tasksCollectionRef = collection(db, "tasks");

const newData = async () => {
  const dataFromDb = await getDocs(tasksCollectionRef);
  const data = dataFromDb.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data;
};

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

export let scrapedData = [];
newData().then((data) => (scrapedData = scrape(data)));
