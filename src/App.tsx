import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useKeyPress } from 'react-use';



const BTN = () => {
  const downArrow = () => {
    // useKeyPress('ArrowDown')

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, { message: '選択範囲ちょうだい' }, (item) => {
        if (!item) {
          alert('選択範囲が見つかりませんでした');
          return;
        } else {
          alert(item);
        }
      });
    });
  }

  return (
    <button onClick={downArrow} >
      down
    </button>
  )

}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>VENUS4</h1>
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

      <BTN />
    </div>
  );
};

export default App;
