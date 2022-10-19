import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./store/errorSlice";
import metaMaskReducer from "./store/metaMaskSlice";

export default configureStore({
  reducer: {
    error: errorReducer,
    metaMask: metaMaskReducer,
  },
});
