import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";

// const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
  4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
  5777: "http://127.0.0.1:7545",
};

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 4: RPC_URLS[4], 5777: RPC_URLS[5777] },
  defaultChainId: 1,
});

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 5777],
});
