import React from "react";
import { Button } from "antd";

import AppContextProvider from "./providers/ContextProvider";
import AppContext from "./config/Context";

import SettingArea from "./components/SettingArea/";
import ConfigTable from "./components/ConfigTable/";
import HighlightCode from "./components/HighlightCode/";

import "antd/dist/antd.css";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
    
      {/* Github Button */}
      <Button ghost icon="github" className="githubBtn">
        <a href="https://github.com/openopen114/gen-grid-column-web" target="_blank">
          {" "}
          Github
        </a>
      </Button>

      {/* Title */}
      <h1 className="app-title">GRID COLUMN GENERATOR</h1>

      {/* App Context Provider */}
      <AppContextProvider>
        {/* Setting Area*/}
        <SettingArea />

        {/* Annotation Config Table*/}
        <ConfigTable />

        {/* Generate Result */}
        <h1 className="result-title">Generate Column Result</h1>
        <HighlightCode />
      </AppContextProvider>
    </div>
  );
};

export default App;
