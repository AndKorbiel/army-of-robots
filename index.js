const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const call = require("./mailer");
const cron = require("node-cron");

cron.schedule("45 15 * * *", async () => {
  try {
    const scrap = await call();
    res.json(scrap).status(200);
  } catch (e) {
    res.send("some kind of error");
  } finally {
    res.send("finished");
  }
});

app.get("/health", (req, res) => {
  res.status(200).json("Server is up");
});

app.get("/scrap", (req, res) => {
  try {
    const scrap = await call();
    res.json(scrap).status(200);
  } catch (e) {
    res.send("some kind of error");
  } finally {
    res.send("finished");
  }
});

app.listen(port, () => {
  console.log("Server is up");
});
