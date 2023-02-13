import React from "react";
import ReactDOM from "react-dom/client";

//REDUCER STUFF: ---
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Reducer from "./state/Reducer";
//--
import "./styles/reset.css";
import "./styles/styles.css";

import App from "./src/App";
//-----------------------------------
/**
 *  Dependencies:
 *
 *  npm i pacel-bundler
 *  npm i react
 *  npm i redux
 *  npm i react-redux
 */

// REDUX STORE
let store;
export const resetStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)));
};
resetStore();
//--

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <h1>Welcome to the GRID</h1>
    <App />
  </Provider>
);
