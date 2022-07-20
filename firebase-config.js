import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmbeJwEFu0kUFGccrAj0OxQgoNI4-89X8",
  authDomain: "task-manager-b0976.firebaseapp.com",
  projectId: "task-manager-b0976",
  storageBucket: "task-manager-b0976.appspot.com",
  messagingSenderId: "542811494484",
  appId: "1:542811494484:web:64f2c0574330848206b5c1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
