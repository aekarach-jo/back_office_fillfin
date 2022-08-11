import React from "react";
import ReactDOM from "react-dom/client";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <header>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link rel="icon" type="image/x-icon" href="favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="../public/assets/scss/sell-product.scss" />
    </header>

    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>
);

reportWebVitals();
