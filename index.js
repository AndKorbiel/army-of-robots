import express from "express";
import bodyParser from "body-parser";
import cron from "node-cron";
import { call } from "./server/mailer.js";
import tasks from "./server/routes/tasks.route.js";
import users from "./server/routes/users.route.js";

const app = express();
const port = process.env.PORT || 5001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cron
cron.schedule("45 15 * * *", async () => {
  try {
    const scrap = await call();
    res.json(scrap).status(200);
  } catch (e) {
    res.send(e);
  }
});

// routes
app.use("/tasks", tasks);
app.use("/users", users);

app.listen(port, () => {
  console.log("Server is up");
});
