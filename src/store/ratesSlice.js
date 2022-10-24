import { createSlice } from "@reduxjs/toolkit";
import { setErrorMessage } from "./errorSlice";
import getConfigXAPIKey from "../utils/getConfigXAPIKey";

const initialState = {
  usdcToWeth: null,
};

export const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    setRate: (state, action) => {
      state[action.payload.label] = action.payload.rate;
    },
    clearRates: () => initialState,
  },
});
export const { setRate, clearRates } = ratesSlice.actions;

export default ratesSlice.reducer;

export function loadRates() {
  return (dispatch) => {
    dispatch(loadUsdcToWeth());
  };
}

function loadUsdcToWeth() {
  return async (dispatch) => {
    const rateEndpoint = "https://rest.coinapi.io/v1/exchangerate/WETH/USDC";
    const requestOptions = {
      method: "GET",
      headers: {
        "X-CoinAPI-Key": getConfigXAPIKey(),
      },
    };
    try {
      fetch(rateEndpoint, requestOptions)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Request failed. Status: ${res.status}`);
          }
          return res.json();
        })
        .then((res) => {
          console.log(res);
          dispatch(setRate({ label: "usdcToWeth", rate: res.rate }));
        });
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    }
  };
}
