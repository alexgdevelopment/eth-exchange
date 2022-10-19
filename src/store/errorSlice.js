import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    error: null,
  },
  reducers: {
    setErrorMessage: (state, action) => {
      console.warn("Error: ", action.payload);
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setErrorMessage, clearError } = errorSlice.actions;

export default errorSlice.reducer;
