import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { resetSwapForm } from "../store/swapSlice";
import { connectAccount, ConnectionStatusEnum } from "./../store/metaMaskSlice";
import Balances from "./Balances";
import SwapForm from "./SwapForm";

const WalletCard = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.error.error);
  const account = useSelector((state) => state.metaMask.account);
  const chainName = useSelector((state) => state.metaMask.chainName);
  const chainId = useSelector((state) => state.metaMask.chainId);
  const connectionStatus = useSelector((state) => state.metaMask.status);
  const configNetworkId = useSelector((state) => state.settings.networkId);
  const [showSwapForm, setShowSwapForm] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => dispatch(connectAccount()));
      window.ethereum.on("chainChanged", () => dispatch(connectAccount()));
    }
  }, [dispatch]);

  function connectionButton() {
    let buttonText;
    switch (connectionStatus) {
      case ConnectionStatusEnum.Connecting:
        buttonText = "Connecting..";
        break;
      case ConnectionStatusEnum.Connected:
        buttonText = "Click to refresh";
        break;
      default:
        buttonText = "Click to connect";
    }
    return (
      <Button onClick={() => dispatch(connectAccount())}>{buttonText}</Button>
    );
  }

  function swapFormButton() {
    const handleToggleSwapFormClick = () => {
      if (showSwapForm) {
        dispatch(resetSwapForm());
      }
      setShowSwapForm(!showSwapForm);
    };
    return (
      <Button onClick={() => handleToggleSwapFormClick()}>{`${
        showSwapForm ? "Hide" : "Show"
      } Swap form`}</Button>
    );
  }

  return (
    <>
      <Typography variant="h6"> Account: {account} </Typography>
      <Typography variant="h6"> Network (ChainId): {chainName} </Typography>
      {connectionButton()}
      {errorMessage ? (
        <Typography variant="body1" color="red">
          Error: {errorMessage}
        </Typography>
      ) : null}
      {chainId === configNetworkId ? <Balances /> : null}
      {swapFormButton()}
      {showSwapForm ? <SwapForm /> : null}
    </>
  );
};

export default WalletCard;
