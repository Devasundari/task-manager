// src/pages/AuthChoice.jsx
import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AuthChoice() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url('https://sockettools.com/wp-content/uploads/2022/04/technology-network-background-scaled.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 350,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(8px)",
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, color: "#fff", fontWeight: "bold" }}>
          Welcome to Task Manager
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ mb: 2 }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>

        <Button
          variant="outlined"
          size="large"
          fullWidth
          sx={{
            color: "#fff",
            borderColor: "#fff",
            "&:hover": { borderColor: "#90caf9", color: "#90caf9" },
          }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
}
