import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useAuth } from "../authContext.jsx";

export default function ProviderRegister() {
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [panFile, setPanFile] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [previewPan, setPreviewPan] = useState("");
  const [previewAadhaar, setPreviewAadhaar] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "pan") {
          setPanFile(file);
          setPreviewPan(reader.result);
        } else {
          setAadhaarFile(file);
          setPreviewAadhaar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    if (!/^([A-Z]{5}[0-9]{4}[A-Z])$/.test(pan)) {
      setError("Please enter a valid PAN number.");
      return;
    }
    if (!/^\d{12}$/.test(aadhaar)) {
      setError("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    if (!panFile || !aadhaarFile) {
      setError("Please upload both PAN and Aadhaar documents.");
      return;
    }
    setError("");
    login("provider");
    alert("Service provider registered!");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Service Provider Registration
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="PAN Card Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={pan}
          onChange={(e) => setPan(e.target.value.toUpperCase())}
          inputProps={{ maxLength: 10, "aria-label": "PAN Card Number" }}
          required
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 1 }}
          aria-label="Upload PAN Document"
        >
          Upload PAN
          <input
            type="file"
            accept="image/*,.pdf"
            hidden
            onChange={(e) => handleFileChange(e, "pan")}
          />
        </Button>
        {previewPan && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">PAN Preview:</Typography>
            <img src={previewPan} alt="PAN Preview" width={100} />
          </Box>
        )}
        <TextField
          label="Aadhaar Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          inputProps={{ maxLength: 12, "aria-label": "Aadhaar Number" }}
          required
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 1 }}
          aria-label="Upload Aadhaar Document"
        >
          Upload Aadhaar
          <input
            type="file"
            accept="image/*,.pdf"
            hidden
            onChange={(e) => handleFileChange(e, "aadhaar")}
          />
        </Button>
        {previewAadhaar && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">Aadhaar Preview:</Typography>
            <img src={previewAadhaar} alt="Aadhaar Preview" width={100} />
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          sx={{ mt: 3 }}
        >
          Register
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Paper>
  );
}
