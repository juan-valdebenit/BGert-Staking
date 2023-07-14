import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({ supportedChainIds: [56, 32520] })

// const RPC_URL = 'https://bsc-dataseed1.binance.org';
export const walletConnect = new WalletConnectConnector({
  // rpc: { 56: "https://bsc-dataseed.binance.org/", 32520: "https://mainnet-rpc.brisescan.com/" },
  rpc: { 56: "https://bsc-dataseed.binance.org/", 32520: "https://dedicated.brisescan.com/" },
  drcode: true,
  // chainId: 56
});