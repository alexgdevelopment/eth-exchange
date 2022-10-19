import { Button, Paper, Stack, Typography, Container } from "@mui/material";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { connectAccount, chainChanged } from "./../store/metaMaskSlice";

const WalletCard = () => {
  const errorMessage = useSelector((state) => state.error.error);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.metaMask.account);
  // const connectionStatus = useSelector(state => state.metaMask.status);
  const ethBalance = useSelector((state) => state.metaMask.eth);
  const nexoBalance = useSelector((state) => state.metaMask.nexo);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => dispatch(connectAccount()));
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6"> Account: {account} </Typography>

          <Typography variant="h6">
            Ether Balance: {ethBalance} {ethBalance ? "ETH" : null}
          </Typography>
          <Typography variant="h6">
            Nexo Balance: {nexoBalance} {nexoBalance ? "NEXO" : null}
          </Typography>
          <Button onClick={() => dispatch(connectAccount())}>
            Connect Account
          </Button>
          {errorMessage ? (
            <Typography variant="body1" color="red">
              Error: {errorMessage}
            </Typography>
          ) : null}
        </Stack>
      </Paper>
    </Container>
  );
};

export default WalletCard;
