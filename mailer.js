const nodemailer = require("nodemailer");
const data = require("./index");
require("dotenv").config();

async function main(data) {
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
    subject: "Hello ✔",
    text: "Hello world?",
    html: data,
  });

  console.log("Message sent: %s", info.messageId);
}

const formatData = (data) => {
  let res = "";
  data.forEach((el) => (res += `<p>${el}</p>`));
  return res;
};

async function call() {
  const dataFromServer = await data;
  const formatted = formatData(dataFromServer);
  main(formatted).catch(console.error);
}

call();
