import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./store/errorSlice";
import metaMaskReducer from "./store/metaMaskSlice";
import balancesReducer from "./store/balancesSlice";
import settingsReducer from "./store/settingsSlice";
import swapReducer from "./store/swapSlice";
import ratesReducer from "./store/ratesSlice";

export default configureStore({
  reducer: {
    error: errorReducer,
    metaMask: metaMaskReducer,
    balances: balancesReducer,
    settings: settingsReducer,
    swap: swapReducer,
    rates: ratesReducer,
  },
});
