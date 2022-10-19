import { createSlice } from "@reduxjs/toolkit";
import { setErrorMessage } from "./errorSlice";
import { loadBalances } from "./balancesSlice";

export const ConnectionStatusEnum = {
  Connected: "Connected",
  Connecting: "Connecting",
  Disconnected: "Disconnected",
};

export const metaMaskSlice = createSlice({
  name: "metaMask",
  initialState: {
    status: ConnectionStatusEnum.Disconnected,
    account: null,
    chainId: null,
  },
  reducers: {
    connecting: (state) => {
      state.status = ConnectionStatusEnum.Connecting;
    },
    connected: (state, action) => {
      state.account = action.payload;
      state.status = ConnectionStatusEnum.Connected;
    },
    disconnected: (state) => {
      state.status = ConnectionStatusEnum.Disconnected;
    },
    chainChanged: (state, action) => {
      state.status = ConnectionStatusEnum.Disconnected;
      state.account = null;
      state.chainId = action.payload;
      connectAccount();
    },
    setChainName: (state, action) => {
      state.chainId = action.payload;
    },
  },
});
export const { connected, disconnected, chainChanged, setChainName } =
  metaMaskSlice.actions;

export default metaMaskSlice.reducer;

function loadNetwork() {
  return async (dispatch) => {
    const chainId = parseInt(
      await window.ethereum.request({ method: "eth_chainId" }),
    );
    if (chainId !== 1) {
      dispatch(
        setErrorMessage(
          "You are not connected to the Ethereum network. Please connect to the Ethereum network",
        ),
      );
      dispatch(setChainName(`Chain ID: ${chainId}`));
    } else {
      dispatch(setChainName("Ethereum Mainnet"));
    }
  };
}

export function connectAccount() {
  return async (dispatch) => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      try {
        dispatch(loadNetwork());
        dispatch(connected(accounts[0]));
        dispatch(loadBalances());
      } catch (e) {
        dispatch(disconnected());
        console.error(e.message);
        dispatch(setErrorMessage("There was a problem connecting to MetaMask"));
      }
    } else {
      dispatch(setErrorMessage("Please install MetaMask"));
    }
  };
}
