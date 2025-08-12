import React, { useState } from "react";
import { Box, Button, TextField, Paper, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // Show success message and redirect to login
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('https://sockettools.com/wp-content/uploads/2022/04/technology-network-background-scaled.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(8px)",
          color: "#fff",
        }}
        elevation={6}
      >
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
          sx={{
            mt: 2,
            backgroundColor: "#0a4768",
            color: "#fff",
            "&:hover": { backgroundColor: "#083a56" },
          }}
        >
          Register
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            onClick={() => navigate("/login")}
            sx={{ cursor: "pointer", color: "#90caf9" }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
