import nodemailer from "nodemailer";
import { scrapedData } from "./scrap.js";
import "dotenv/config";

async function main(scrapedData) {
  const transporter = nodemailer.createTransport({
    host: "mrandree.nazwa.pl",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Twój alert cenowy" <${process.env.USER}>`,
    to: `${process.env.USER}, akorbiel@interia.pl`,
    subject: "Twój codzienny raport od robota ✔",
    text: "",
    html: scrapedData,
  });

  console.log("Message sent: %s", info.messageId);
}

const formatData = (scrapedData) => {
  let res = "";
  scrapedData.forEach((el) => (res += `<p>${el}</p>`));
  return res;
};

export async function call() {
  const dataFromServer = await scrapedData;
  const formatted = formatData(dataFromServer);
  console.log(formatted);
  main(formatted).catch(console.error);
}
