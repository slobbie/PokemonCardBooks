import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import App from "./App";
import rootReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

const store = createStore(rootReducer, composeWithDevTools()); // 스토어 생성

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
