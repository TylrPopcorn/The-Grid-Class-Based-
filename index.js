import React from "react";
import ReactDOM from "react-dom/client";

import App from "./src/App";

import "./styles/reset.css";
import "./styles/styles.css";

/**
 *  Dependencies:
 *
 *  npm i pacel-bundler
 *  npm i react
 *
 */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <h1>Welcome to the GRID</h1>
    <App />
  </React.StrictMode>
);
