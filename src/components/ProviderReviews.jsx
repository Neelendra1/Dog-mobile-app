import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, MenuItem } from "@mui/material";

const mockProviders = [
  { id: 1, name: "John's Dog Walking", avgRating: 4.5, reviews: [
    { user: "Amit", rating: 5, comment: "Great service!" },
    { user: "Priya", rating: 4, comment: "Very friendly." }
  ] },
  { id: 2, name: "PetCare Mumbai", avgRating: 4.0, reviews: [
    { user: "Rahul", rating: 4, comment: "Good experience." }
  ] }
];

export default function ProviderReviews() {
  const [providers, setProviders] = useState(mockProviders);
  const [selected, setSelected] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleAddReview = () => {
    if (!comment || rating < 1 || rating > 5) {
      setError("Please enter a valid rating and comment.");
      return;
    }
    setError("");
    const updatedProviders = [...providers];
    updatedProviders[selected].reviews.push({ user: "You", rating, comment });
    const ratings = updatedProviders[selected].reviews.map(r => r.rating);
    updatedProviders[selected].avgRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
    setProviders(updatedProviders);
    setRating(5); setComment("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>Provider Ratings & Reviews</Typography>
      <TextField
        select
        label="Select Provider"
        value={selected}
        onChange={e => setSelected(Number(e.target.value))}
        fullWidth
        margin="normal"
        aria-label="Select Provider"
      >
        {providers.map((p, idx) => <MenuItem key={p.id} value={idx}>{p.name}</MenuItem>)}
      </TextField>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">{providers[selected].name}</Typography>
        <Typography>Average Rating: {providers[selected].avgRating}</Typography>
        <Box sx={{ mt: 1 }}>
          {providers[selected].reviews.map((r, idx) => (
            <Typography key={idx} variant="body2">{r.user}: {r.rating}★ - {r.comment}</Typography>
          ))}
        </Box>
      </Box>
      <Typography variant="subtitle1">Add Your Review</Typography>
      <TextField
        label="Rating (1-5)"
        type="number"
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
        inputProps={{ min: 1, max: 5, "aria-label": "Rating" }}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
        inputProps={{ "aria-label": "Comment" }}
        fullWidth
        margin="normal"
        required
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleAddReview} sx={{ mt: 2 }}>
        Submit Review
      </Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Paper>
  );
}
