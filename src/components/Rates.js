import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRates } from "../store/ratesSlice";

const Rates = () => {
  const dispatch = useDispatch();
  const usdcToWeth = useSelector((state) => state.rates.usdcToWeth);

  useEffect(() => {
    dispatch(loadRates());
  }, [dispatch]);
  return (
    <>
      <Typography variant="h6">1 WETH = {usdcToWeth} USDC</Typography>
    </>
  );
};

export default Rates;
