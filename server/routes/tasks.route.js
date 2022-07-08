import express from "express";
import { call } from "../mailer.js";
import { db } from "../../firebase-config.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

const app = express();
const tasksCollectionRef = collection(db, "tasks");

app.get("/", async (req, res) => {
  const dataFromDb = await getDocs(tasksCollectionRef);
  const data = dataFromDb.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  res.json(data);
});

app.post("/", async (req, res) => {
  try {
    const doc = await addDoc(tasksCollectionRef, req.body);
    res.status(200).send("New task added");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get("/health", (req, res) => {
  res.status(200).json("Server is up");
});

app.get("/scrap", async (req, res) => {
  try {
    const scrap = await call();
    res.json(scrap).status(200);
  } catch (e) {
    res.send(e);
  }
});

export default app;
