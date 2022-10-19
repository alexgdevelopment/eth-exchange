import { createSlice } from "@reduxjs/toolkit";
import { setErrorMessage } from "./errorSlice";
import { ethers } from "ethers";
import { NEXO_ADDRESS } from "../utils/constants";
import { nexoAbi } from "../utils/abis";

export const balancesSlice = createSlice({
  name: "balances",
  initialState: {
    eth: null,
    nexo: null,
  },
  reducers: {
    setBalance: (state, action) => {
      state[action.payload.coin] = action.payload.amount;
    },
    clearBalances: (state) => {
      Object.keys(state).forEach((key) => (state[key] = null));
    },
  },
});
export const { setBalance, clearBalances } = balancesSlice.actions;

export default balancesSlice.reducer;

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
