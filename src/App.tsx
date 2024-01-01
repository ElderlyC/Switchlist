import React, { useState, ChangeEvent } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [itemList, setItemList] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setItemList(e.target.value);
  };

  const handleStart = () => {
    console.log(itemList);
    setItemList("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SwitchList</h1>
        <p>
          Enter a list of anything, set the intervals, then start the cycle.
        </p>
        <textarea
          placeholder="Enter list items separated by lines"
          rows={10}
          onChange={handleChange}
          value={itemList}
        ></textarea>
        <button onClick={handleStart}>Start!</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
