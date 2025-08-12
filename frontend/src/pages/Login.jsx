import React, { useState } from "react";
import { Box, Button, TextField, Paper, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);
    setToken(data.token);
    navigate("/dashboard");
  } catch (err) {
    console.error("Login failed:", err);
    alert("Invalid email or password");
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
        <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{
            style: {
              color: "#fff",
              backgroundColor: "rgba(255, 255, 255, 0.1)", // semi-transparent dark
            },
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
            style: {
              color: "#fff",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#0a4768",
            color: "#fff",
            "&:hover": { backgroundColor: "#083a56" },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 2, textAlign: "center", color: "#fff" }}
        >
          Don’t have an account?{" "}
          <Link
            onClick={() => navigate("/register")}
            sx={{ cursor: "pointer", color: "#90caf9" }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
