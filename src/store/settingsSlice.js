import { createSlice } from "@reduxjs/toolkit";
import getConfigNetworkId from "../utils/getConfigNetworkId";
import getConfigNetworkName from "../utils/getConfigNetworkName";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    networkId: null,
    networkName: null,
  },
  reducers: {
    setNetworkId: (state, action) => {
      state.networkId = action.payload;
    },
    setNetworkName: (state, action) => {
      state.networkName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNetworkId, setNetworkName } = settingsSlice.actions;

export default settingsSlice.reducer;
export function init() {
  return async (dispatch) => {
    dispatch(setNetworkId(getConfigNetworkId()));
    dispatch(setNetworkName(getConfigNetworkName()));
  };
}
