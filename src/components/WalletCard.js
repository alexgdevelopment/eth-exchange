import { Button, Paper, Stack, Typography, Container } from "@mui/material";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  connectAccount,
  chainChanged,
  ConnectionStatusEnum,
} from "./../store/metaMaskSlice";
import Balances from "./Balances";

const WalletCard = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.error.error);
  const account = useSelector((state) => state.metaMask.account);
  const chainId = useSelector((state) => state.metaMask.chainId);
  const connectionStatus = useSelector((state) => state.metaMask.status);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => dispatch(connectAccount()));
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

  function connectionButton() {
    let buttonText;
    switch (connectionStatus) {
      case ConnectionStatusEnum.Connecting:
        buttonText = "Connecting..";
        break;
      case ConnectionStatusEnum.Connected:
        buttonText = "Connected";
        break;
      default:
        buttonText = "Click to connect";
    }
    return (
      <Button onClick={() => dispatch(connectAccount())}>{buttonText}</Button>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6"> Account: {account} </Typography>
          <Typography variant="h6"> Network (ChainId): {chainId} </Typography>

          {connectionStatus === ConnectionStatusEnum.Connected ? (
            <Balances />
          ) : null}
          {connectionButton()}
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
