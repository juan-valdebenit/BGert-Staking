import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { MetaMaskProvider } from "./wallet/hook";

function getLibrary(provider, connector) {
  return new Web3(provider);
}

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Web3ReactProvider getLibrary={getLibrary}> */}
      {/* <MetaMaskProvider> */}
      <App />
      {/* </MetaMaskProvider> */}
      {/* </Web3ReactProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);

// reportWebVitals();
