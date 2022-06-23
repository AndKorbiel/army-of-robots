const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const call = require("./mailer");

app.get("/scrap", async (req, res) => {
  try {
    // const scrap = await call();
    // res.json(scrap).status(200);
    res.send("działam do jasnej anielki");
  } catch (e) {
    res.send(e);
  }
});

app.listen(port, () => {
  console.log("Server is up");
});
