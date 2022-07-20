import express from "express";
import { auth } from "../../firebase-config.js";
import { signInWithEmailAndPassword, signOut } from "@firebase/auth";

const app = express();

app.get("/getData", async (req, res) => {
  if (auth.currentUser) {
    res.status(200).send(auth.currentUser);
  } else {
    res.status(500).send("User not logged in");
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      req.body.userName,
      req.body.userPass
    );
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/logout", async (req, res) => {
  try {
    await signOut(auth);
    res.status(200).send("User log out");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default app;
