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
