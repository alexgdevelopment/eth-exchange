import { createSlice } from "@reduxjs/toolkit";
import { clearError, setErrorMessage } from "./errorSlice";
import { ethers } from "ethers";
import { WETH_ADDRESS } from "../utils/constants";
import { wethAbi } from "../utils/abis";

const initialState = {
  toAddress: WETH_ADDRESS,
  toCurrency: "WETH",
  amount: "",
};

export const swapSlice = createSlice({
  name: "swap",
  initialState,
  reducers: {
    setToAddress: (state, action) => {
      state.toAddress = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    resetSwapForm: () => initialState,
  },
});
export const { setAmount, setToAddress, resetSwapForm } = swapSlice.actions;

export default swapSlice.reducer;

async function swapToWeth(amount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();
  const wethContract = new ethers.Contract(WETH_ADDRESS, wethAbi, signer);
  await wethContract["deposit"]({
    value: ethers.utils.parseEther(amount),
  });
}

export function executeSwap() {
  return async (dispatch, getState) => {
    try {
      dispatch(clearError());
      const state = getState();
      switch (state.swap.toAddress) {
        case WETH_ADDRESS:
          await swapToWeth(state.swap.amount.toString());
          dispatch(resetSwapForm());
          break;
        default:
          dispatch(setErrorMessage("Unsupported swap address"));
      }
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    }
  };
}
