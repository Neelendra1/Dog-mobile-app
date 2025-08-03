import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petPhoto, setPetPhoto] = useState("");

  const handleAddPet = () => {
    if (!petName || !petBreed || !petAge) return;
    setPets([...pets, { name: petName, breed: petBreed, age: petAge, photo: petPhoto }]);
    setPetName(""); setPetBreed(""); setPetAge(""); setPetPhoto("");
  };

  const handleDeletePet = idx => {
    setPets(pets.filter((_, i) => i !== idx));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>User Profile</Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={e => setName(e.target.value)}
          inputProps={{ "aria-label": "Name" }}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
          inputProps={{ "aria-label": "Email" }}
        />
      </Box>
      <Typography variant="h6" sx={{ mt: 3 }}>My Pets</Typography>
      <Box>
        {pets.length === 0 && <Typography>No pets added yet.</Typography>}
        {pets.map((pet, idx) => (
          <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            {pet.photo && <img src={pet.photo} alt={pet.name} width={50} style={{ marginRight: 8 }} />}
            <Typography sx={{ flexGrow: 1 }}>{pet.name} ({pet.breed}, {pet.age} yrs)</Typography>
            <IconButton aria-label={`Delete ${pet.name}`} onClick={() => handleDeletePet(idx)}><DeleteIcon /></IconButton>
          </Box>
        ))}
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Add Pet</Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          label="Pet Name"
          variant="outlined"
          value={petName}
          onChange={e => setPetName(e.target.value)}
          inputProps={{ "aria-label": "Pet Name" }}
        />
        <TextField
          label="Breed"
          variant="outlined"
          value={petBreed}
          onChange={e => setPetBreed(e.target.value)}
          inputProps={{ "aria-label": "Breed" }}
        />
        <TextField
          label="Age"
          type="number"
          variant="outlined"
          value={petAge}
          onChange={e => setPetAge(e.target.value)}
          inputProps={{ min: 0, "aria-label": "Age" }}
        />
        <TextField
          label="Photo URL"
          variant="outlined"
          value={petPhoto}
          onChange={e => setPetPhoto(e.target.value)}
          inputProps={{ "aria-label": "Photo URL" }}
        />
        <Button variant="contained" color="primary" onClick={handleAddPet} sx={{ mt: 1 }}>
          Add Pet
        </Button>
      </Box>
    </Paper>
  );
}
