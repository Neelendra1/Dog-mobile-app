import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handlePayment = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setError("");
    setStatus("Payment Successful!");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Payment
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Amount"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{
            min: 1,
            step: 1,
            "aria-label": "Amount",
          }}
          required
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePayment}
          sx={{ mt: 3 }}
        >
          Pay
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {status && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          {status}
        </Typography>
      )}
    </Paper>
  );
}
