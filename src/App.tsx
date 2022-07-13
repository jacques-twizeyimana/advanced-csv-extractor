import { useState } from "react";
import "./App.css";
import Button from "./components/atoms/Button";
import Popup from "./components/molecules/Popup";

function App() {
  return (
    <div className="App p-12 bg-red-500">
      <Button>Welcome</Button>
      <Popup open title={"Import data"}>
        <div className="w-[700px] max-w-3xl">
          <h2>Umport data</h2>
        </div>
      </Popup>
    </div>
  );
}

export default App;
