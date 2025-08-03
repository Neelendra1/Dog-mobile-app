import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useAuth } from "../authContext.jsx";

export default function UserRegister() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSendOtp = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setError("");
    login("user");
    alert("Registration successful!");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        User Registration
      </Typography>
      {step === 1 ? (
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 10,
              "aria-label": "Mobile Number",
            }}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSendOtp}
            sx={{ mt: 2 }}
          >
            Send OTP
          </Button>
        </Box>
      ) : (
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Enter OTP"
            variant="outlined"
            fullWidth
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 6,
              "aria-label": "OTP",
            }}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleVerifyOtp}
            sx={{ mt: 2 }}
          >
            Verify OTP
          </Button>
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Paper>
  );
}
