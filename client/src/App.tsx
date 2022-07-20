import "./styles/App.css";
import TopBar from "./components/TopBar/TopBar.container";
import { Routes, Route } from "react-router-dom";
import AddTaskPage from "./views/AddTaskPage";
import Home from "./views/Home";
import LoginPage from "./views/LoginPage";

function App(): JSX.Element {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add-task" element={<AddTaskPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
