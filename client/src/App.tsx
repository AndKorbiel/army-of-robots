import React from "react";
import "./styles/App.css";
import CustomInput from "./components/CustomInput";
import CustomList from "./components/CustomList";

function App(): JSX.Element {
  return (
    <div className="App">
      <h2>Send message to backend</h2>
      <CustomInput />
      <hr />
      <CustomList />
    </div>
  );
}

export default App;
