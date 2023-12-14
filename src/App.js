import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import Home from "./pages/Home";
import BriseStake from "./pages/BriseStake";
import Exchange from "./pages/Exchange";

const chains = [bsc];
const projectId = "90808b7198baba01ac8f7dc04c1a4fbd";
const { publicClient, webSocketPublicClient } = configureChains(chains, [
  w3mProvider({ projectId }),
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient,
});

function App() {
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  return (
    <div>
      <WagmiConfig config={wagmiConfig}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header client={ethereumClient} />
                <Home client={ethereumClient} />
              </>
            }
          />
          <Route
            exact
            path="/briseStake"
            element={
              <>
                <Header client={ethereumClient} />
                <BriseStake client={ethereumClient} />
              </>
            }
          />
          <Route
            exact
            path="/Exchange"
            element={
              <>
                <Header client={ethereumClient} />
                <Exchange client={ethereumClient} />
              </>
            }
          />
        </Routes>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
}

export default App;
