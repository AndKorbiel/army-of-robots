import "./styles/App.css";
import TopBar from "./components/TopBar/TopBar.container";
import { Routes, Route } from "react-router-dom";
import AddTaskPage from "./views/AddTaskPage";
import Home from "./views/Home";
import LoginPage from "./views/LoginPage";
import { useAppSelector } from "./state/hooks";

function App(): JSX.Element {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <LoginPage />}></Route>
        <Route
          path="/add-task"
          element={isLoggedIn ? <AddTaskPage /> : <LoginPage />}
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
