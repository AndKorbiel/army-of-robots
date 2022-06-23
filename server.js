const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const call = require("./mailer");

app.get("/scrap", async (req, res) => {
  const scrap = await call();
  res.send("done").status(200);
});

app.listen(port, () => {
  console.log("Server is up");
});
