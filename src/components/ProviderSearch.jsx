import React, { useState, useEffect } from "react";

const mockProviders = [
  { id: 1, name: "Dog Walker 1", city: "Pune", rating: 4.5, service: "Dog Walking", available: true },
  { id: 2, name: "Dog Walker 2", city: "Mumbai", rating: 4.0, service: "Dog Sitting", available: false },
  { id: 3, name: "Dog Walker 3", city: "Delhi", rating: 4.8, service: "Dog Boarding", available: true },
  { id: 4, name: "Dog Walker 4", city: "Bangalore", rating: 4.2, service: "Hospital Booking", available: true }
];
const cities = ["Pune", "Mumbai", "Delhi", "Bangalore"];
const services = ["Dog Walking", "Dog Sitting", "Dog Boarding", "Hospital Booking"];
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Checkbox,
  FormControlLabel,
  Rating
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PetsIcon from "@mui/icons-material/Pets";


export default function ProviderSearch() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [showAvailable, setShowAvailable] = useState(false);
  const [error, setError] = useState("");

  const filtered = mockProviders.filter(p =>
    (!city || p.city === city) &&
    (!service || p.service === service) &&
    p.rating >= minRating &&
    (!showAvailable || p.available)
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city && !service && !minRating && !showAvailable) {
      setError("Please select at least one filter to search.");
      return;
    }
    setError("");
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        margin: 0,
        display: 'block',
        width: '100%',
        minHeight: '100vh',
        maxWidth: 420,
        mx: 'auto',
        mt: 0,
        p: 3,
        borderRadius: 3
      }}
      aria-label="Search Service Providers"
    >
      <Typography variant="h5" component="h2" gutterBottom>
        <SearchIcon sx={{ mr: 1, verticalAlign: "middle" }} /> Search Service Providers
      </Typography>
      <Box component="form" onSubmit={handleSearch} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          select
          label="City"
          id="city"
          value={city}
          onChange={e => setCity(e.target.value)}
          aria-label="Select city"
        >
          <MenuItem value="">All Cities</MenuItem>
          {cities.map(c => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Service"
          id="service"
          value={service}
          onChange={e => setService(e.target.value)}
          aria-label="Select service"
        >
          <MenuItem value="">All Services</MenuItem>
          {services.map(s => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2">Min Rating:</Typography>
          <Rating
            name="min-rating"
            value={minRating}
            precision={0.5}
            onChange={(e, val) => setMinRating(val || 0)}
            aria-label="Minimum rating"
          />
        </Box>
        <FormControlLabel
          control={<Checkbox checked={showAvailable} onChange={e => setShowAvailable(e.target.checked)} />}
          label="Available Only"
        />
        {error && (
          <Typography color="error" variant="body2" role="alert">{error}</Typography>
        )}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }} aria-label="Search">
          Search
        </Button>
      </Box>
      <Typography variant="h6" sx={{ mt: 3 }}>Results</Typography>
      <List sx={{ mt: 1 }} aria-label="Search results">
        {filtered.length === 0 ? (
          <ListItem>
            <ListItemText primary="No providers found." />
          </ListItem>
        ) : (
          filtered.map(p => (
            <ListItem key={p.id} divider>
              <ListItemIcon><PetsIcon color={p.available ? "primary" : "disabled"} /></ListItemIcon>
              <ListItemText
                primary={<span><b>{p.name}</b> ({p.city})</span>}
                secondary={<span>{p.service} &nbsp; | &nbsp; <Rating value={p.rating} precision={0.1} readOnly size="small" /> &nbsp; {p.available ? "Available" : "Unavailable"}</span>}
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}
