import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import * as serviceWorker from "./service-worker";
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

// PWA service worker 등록
if (
  window.location.pathname.startsWith("/product/") ||
  window.location.pathname.startsWith("/m/")
) {
  serviceWorker.register();
} else {
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
