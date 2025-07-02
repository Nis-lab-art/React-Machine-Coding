import { useState } from "react";
import "./App.css";
import Checkboxes from "./Checkboxes";
import { checkboxesData } from "./data";

function App() {
  return (
    <main>
      <h1>Nested Checkbox</h1>
      <Checkboxes checkboxesData={checkboxesData} />
    </main>
  );
}

export default App;
