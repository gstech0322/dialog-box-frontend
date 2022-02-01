import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from './store';
import { Web3ReactProvider } from '@web3-react/core';
import App from "./App";
import Web3 from 'web3';

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
