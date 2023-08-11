import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Contextapi from "./component/Contextapi.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Contextapi>
      <App />
    </Contextapi>
  </React.StrictMode>
);
