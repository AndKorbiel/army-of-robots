const nodemailer = require("nodemailer");
const data = require("./scrap");
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
    subject: "Twój codzienny raport od robota ✔",
    text: "",
    html: data,
  });

  console.log("Message sent: %s", info.messageId);
}

const formatData = (data) => {
  let res = "";
  data.forEach((el) => (res += `<p>${el}</p>`));
  return res;
};

module.exports = async function call() {
  const dataFromServer = await data;
  const formatted = formatData(dataFromServer);
  console.log(formatted);
  main(formatted).catch(console.error);
};
