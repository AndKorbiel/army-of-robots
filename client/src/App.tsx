import React from "react";
import "./styles/App.css";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import AddTaskPage from "./views/AddTaskPage";
import Home from "./views/Home";

function App(): JSX.Element {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add-task" element={<AddTaskPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
