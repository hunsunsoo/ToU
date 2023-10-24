import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { App1, App2, App3 } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from './serviceWorker';

const RootComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/product/*" element={<App1 />} />
        <Route path="/m/*" element={<App2 />} />
        <Route path="/*" element={<App3 />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RootComponent />);

// PWA service worker 등록
serviceWorker.register();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
