import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import { StateProvider } from "./Context/Store.js";

ReactDOM.render(
  <StateProvider>
      <App />
  </StateProvider>,
  document.querySelector("#root")
);
