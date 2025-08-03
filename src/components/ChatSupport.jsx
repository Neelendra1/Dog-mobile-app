import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

const mockMessages = [
  { sender: "Support", text: "Welcome to Dog Lovers Support! How can we help you?" }
];

export default function ChatSupport() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSend = () => {
    if (!input.trim()) {
      setError("Please enter a message.");
      return;
    }
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
    setError("");
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: "Support", text: "Thank you! We'll get back to you soon." }]);
    }, 1000);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>Chat & Support</Typography>
      <Box sx={{ border: "1px solid #ccc", p: 1, height: 200, overflowY: "auto", mb: 2 }} aria-live="polite">
        {messages.map((msg, idx) => (
          <Typography key={idx} variant="body2"><b>{msg.sender}:</b> {msg.text}</Typography>
        ))}
      </Box>
      <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          inputProps={{ "aria-label": "Message" }}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSend} aria-label="Send Message">
          Send
        </Button>
      </Box>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Paper>
  );
}
