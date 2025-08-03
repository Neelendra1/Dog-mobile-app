import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, MenuItem } from "@mui/material";

const services = [
  "Dog Walking",
  "Pet Sitting",
  "Cab for Pet Travel",
  "Dog Boarding",
  "Hospital Booking"
];
const cities = ["Pune", "Mumbai", "Delhi", "Bangalore"];
const durations = ["Daily", "Monthly"];

export default function Booking() {
  const [service, setService] = useState(services[0]);
  const [city, setCity] = useState(cities[0]);
  const [duration, setDuration] = useState(durations[0]);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleBooking = () => {
    if (!date) {
      setError("Please select a date.");
      return;
    }
    setError("");
    alert(`Booked ${service} in ${city} for ${duration} on ${date}`);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>Book a Service</Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          select
          label="Service"
          value={service}
          onChange={e => setService(e.target.value)}
          fullWidth
          margin="normal"
          required
          aria-label="Service"
        >
          {services.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </TextField>
        <TextField
          select
          label="City"
          value={city}
          onChange={e => setCity(e.target.value)}
          fullWidth
          margin="normal"
          required
          aria-label="City"
        >
          {cities.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField
          select
          label="Duration"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          fullWidth
          margin="normal"
          required
          aria-label="Duration"
        >
          {durations.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
        </TextField>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
          aria-label="Date"
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleBooking} sx={{ mt: 3 }}>
          Book
        </Button>
      </Box>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Paper>
  );
}
