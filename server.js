const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

app.get("/scrap", (req, res) => {
  res.send("scraping");
});

app.listen(port, () => {
  console.log("Server is up");
});
