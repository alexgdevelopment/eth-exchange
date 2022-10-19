import { createSlice } from "@reduxjs/toolkit";
import { setErrorMessage } from "./errorSlice";
import { ethers } from "ethers";
import { NEXO_ADDRESS } from "../utils/constants";
import { nexoAbi } from "../utils/abis";

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
    eth: null,
    nexo: null,
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
    setBalance: (state, action) => {
      state[action.payload.coin] = action.payload.amount;
    },
    clearBalances: (state) => {
      Object.keys(state).forEach((key) => (state[key] = null));
    },
  },
});
export const {
  connected,
  disconnected,
  chainChanged,
  setBalance,
  clearBalances,
} = metaMaskSlice.actions;

export default metaMaskSlice.reducer;

export function connectAccount() {
  return async (dispatch) => {
    if (window.ethereum) {
      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      try {
        dispatch(connected(res[0]));
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

export function loadBalances() {
  return (dispatch) => {
    dispatch(loadEthBalance());
    dispatch(loadNexoBalance());
  };
}

function loadEthBalance() {
  return async (dispatch) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [window.ethereum.selectedAddress.toString(), "latest"],
      });
      dispatch(
        setBalance({ coin: "eth", amount: ethers.utils.formatEther(balance) }),
      );
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    }
  };
}

function loadNexoBalance() {
  return async (dispatch) => {
    const provider = ethers.getDefaultProvider();
    try {
      const erc20 = new ethers.Contract(NEXO_ADDRESS, nexoAbi, provider);
      const nexoUint = ethers.BigNumber.from(
        await erc20["balanceOf"](window.ethereum.selectedAddress.toString()),
      );
      const decimals = await erc20["decimals"]();
      dispatch(
        setBalance({
          coin: "nexo",
          amount: ethers.utils.formatUnits(nexoUint, decimals),
        }),
      );
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    }
  };
}
