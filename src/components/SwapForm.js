import React from "react";
import { TextField, Button, InputAdornment, Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { executeSwap, setAmount, resetSwapForm } from "../store/swapSlice";
const SwapForm = () => {
  const amount = useSelector((state) => state.swap.amount);
  const toCurrency = useSelector((state) => state.swap.toCurrency);
  const dispatch = useDispatch();

  return (
    <>
      <Grid display="flex" direction="row" justifyContent="center">
        <Box sx={{ maxWidth: 260 }}>
          <TextField
            id="swap-amount"
            label="Amount"
            variant="standard"
            type="number"
            value={amount}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{toCurrency}</InputAdornment>
              ),
            }}
            onChange={(e) => dispatch(setAmount(e.target.value))}
          />
        </Box>
      </Grid>
      <Button
        onClick={() => dispatch(executeSwap())}
        disabled={!parseFloat(amount)}
      >
        Execute Swap
      </Button>
      <Button
        onClick={() => dispatch(resetSwapForm())}
        disabled={!parseFloat(amount)}
      >
        Reset Form Fields
      </Button>
    </>
  );
};

export default SwapForm;
