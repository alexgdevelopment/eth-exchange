import { createSlice } from "@reduxjs/toolkit";
import { setErrorMessage } from "./errorSlice";
import { ethers } from "ethers";
import { NEXO_ADDRESS, WETH_ADDRESS } from "../utils/constants";
import { nexoAbi, wethAbi } from "../utils/abis";

const initialState = {
  eth: null,
  nexo: null,
  weth: null,
};

export const balancesSlice = createSlice({
  name: "balances",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state[action.payload.coin] = action.payload.amount;
    },
    clearBalances: () => initialState,
  },
});
export const { setBalance, clearBalances } = balancesSlice.actions;

export default balancesSlice.reducer;

export function loadBalances() {
  return (dispatch) => {
    dispatch(loadEthBalance());
    dispatch(loadNexoBalance());
    dispatch(loadWethBalance());
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

async function getNexoBalanceAndDecimals() {
  const provider = ethers.getDefaultProvider();

  const nexoContract = new ethers.Contract(NEXO_ADDRESS, nexoAbi, provider);

  const balance = nexoContract["balanceOf"](
    window.ethereum.selectedAddress.toString(),
  );
  const decimals = nexoContract["decimals"]();
  return {
    balance: await balance,
    decimals: await decimals,
  };
}

function loadNexoBalance() {
  return async (dispatch) => {
    try {
      const { balance, decimals } = await getNexoBalanceAndDecimals();
      const nexoUint = ethers.BigNumber.from(balance);
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

async function getWethBalanceAndDecimals() {
  const provider = ethers.getDefaultProvider();

  const wethContract = new ethers.Contract(WETH_ADDRESS, wethAbi, provider);

  const balance = wethContract["balanceOf"](
    window.ethereum.selectedAddress.toString(),
  );
  const decimals = wethContract["decimals"]();
  return {
    balance: await balance,
    decimals: await decimals,
  };
}

function loadWethBalance() {
  return async (dispatch) => {
    try {
      const { balance, decimals } = await getWethBalanceAndDecimals();
      const wethUint = ethers.BigNumber.from(balance);
      console.log("setting balance", wethUint);
      dispatch(
        setBalance({
          coin: "weth",
          amount: ethers.utils.formatUnits(wethUint, decimals),
        }),
      );
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    }
  };
}
