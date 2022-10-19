import { Typography } from "@mui/material";
import React from "react";

import { useSelector } from "react-redux";

const Balances = () => {
  const ethBalance = useSelector((state) => state.balances.eth);
  const nexoBalance = useSelector((state) => state.balances.nexo);

  return (
    <>
      <Typography variant="h6">
        Ether Balance: {ethBalance} {ethBalance ? "ETH" : null}
      </Typography>
      <Typography variant="h6">
        Nexo Balance: {nexoBalance} {nexoBalance ? "NEXO" : null}
      </Typography>
    </>
  );
};

export default Balances;
