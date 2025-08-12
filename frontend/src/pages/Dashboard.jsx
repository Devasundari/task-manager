import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Tooltip,
  IconButton,
  Box,
  TextField,
  MenuItem,
  AppBar,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ProjectForm from "./ProjectForm";
import Logo from "../assets/project-tracker-logo.png";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [filters, setFilters] = useState({ search: "", status: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch projects from backend
  useEffect(() => {
    axios
      .get("https://task-manager-bsu9.onrender.com/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleSaveProject = (project) => {
    if (
      !project.name ||
      !project.description ||
      !project.deadline ||
      !project.status
    ) {
      alert("Please fill all the inputs");
      return;
    }

    if (editProject) {
      // Update existing project
      axios
        .put(`https://task-manager-bsu9.onrender.com/api/projects/${editProject._id}`, project)
        .then((res) => {
          setProjects(
            projects.map((p) => (p._id === editProject._id ? res.data : p))
          );
          setEditProject(null);
          setOpenForm(false);
        })
        .catch((err) => console.error(err));
    } else {
      // Create new project
      axios
        .post("https://task-manager-bsu9.onrender.com/api/projects", project)
        .then((res) => {
          setProjects([...projects, res.data]);
          setOpenForm(false);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://task-manager-bsu9.onrender.com/api/projects/${id}`)
      .then(() => {
        setProjects(projects.filter((p) => p._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setOpenForm(true);
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.status ? p.status === filters.status : true)
  );

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      setError("Failed to load projects");
    }
    setIsLoading(false);
  };
  
  return (
    <>
    {isLoading && <CircularProgress />}
    {error && <Alert severity="error">{error}</Alert>}
    <Box
      sx={{
        backgroundImage: `url('https://sockettools.com/wp-content/uploads/2022/04/technology-network-background-scaled.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(6px)",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* App Bar */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#0a4768",
            "&:hover": { backgroundColor: "#083954" },
          }}
        >
          <Toolbar>
            <Box
              component="img"
              src={Logo}
              alt="Taskify Logo"
              sx={{
                height: 50,
                width: 50,
                mr: 1,
                objectFit: "contain",
              }}
            />
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
              Taskify
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 3 }}>
          {/* Top Bar */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" sx={{ color: "#fff" }}>
              My Projects
            </Typography>
            <Box>
              <IconButton
                onClick={() => setSearchPanelOpen(!searchPanelOpen)}
                sx={{ color: "#fff" }}
              >
                {searchPanelOpen ? <CloseIcon /> : <SearchIcon />}
              </IconButton>
              <Button
                variant="contained"
                onClick={() => {
                  setEditProject(null);
                  setOpenForm(true);
                }}
                sx={{
                  ml: 2,
                  backgroundColor: "#0a4768",
                  "&:hover": { backgroundColor: "#083954" },
                }}
              >
                Add Project
              </Button>
            </Box>
          </Box>

          {/* Search Filter */}
          {searchPanelOpen && (
            <Box
              sx={{
                p: 2,
                mb: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(4px)",
              }}
            >
              <TextField
                label="Search by Name"
                variant="outlined"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
              <TextField
                select
                label="Filter by Status"
                variant="outlined"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Box>
          )}

          {/* Project List */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 2,
            }}
          >
            {" "}
            {filteredProjects.map((project) => (
              <Card key={project._id} sx={{ height: 250 }}>
                {" "}
                <Tooltip title="Touch the card to edit the project" arrow>
                  <Card
                    sx={{
                      height: 250, // fixed height for uniformity
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      borderRadius: 2,
                      boxShadow: 3,
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      backdropFilter: "blur(4px)",
                      color: "#000000ff",
                      overflow: "hidden",
                      "&:hover": { boxShadow: 6 },
                      position: "relative",
                    }}
                    onClick={() => handleEdit(project)}
                  >
                    <Chip
                      label="Edited"
                      color="warning"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 10,
                        backgroundColor: "rgba(255, 165, 0, 0.9)", // bright orange background for visibility
                      }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {project.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3, // limits to 3 lines
                          WebkitBoxOrient: "vertical",
                          flexGrow: 1,
                        }}
                      >
                        {project.description}
                      </Typography>

                      <Typography variant="caption" sx={{ mt: "auto" }}>
                        Deadline:{" "}
                        {new Date(project.deadline).toLocaleDateString()}
                      </Typography>

                      {/* Highlighted Status */}
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          fontWeight: "bold",
                          color:
                            project.status === "Completed"
                              ? "lightgreen"
                              : project.status === "In Progress"
                              ? "#ffd54f"
                              : "tomato",
                        }}
                      >
                        {project.status}
                      </Typography>
                    </CardContent>

                    <CardActions
                      sx={{
                        borderTop: "1px solid rgba(255,255,255,0.2)",
                        pt: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        size="small"
                        sx={{ color: "red" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(project._id);
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Tooltip>
              </Card>
            ))}
          </Box>
          {openForm && (
            <ProjectForm
              onSubmit={handleSaveProject}
              onClose={() => setOpenForm(false)}
              initialData={editProject}
            />
          )}
        </Container>
      </Box>
    </Box>
    </>
  );
}
