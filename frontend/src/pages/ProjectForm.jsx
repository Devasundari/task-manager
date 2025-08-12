import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

export default function ProjectForm({ onSubmit, onClose, initialData }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    deadline: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Project name is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.deadline.trim()) newErrors.deadline = "Deadline is required";
    if (!form.status.trim()) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>{initialData ? "Edit Project" : "Add Project"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Project Name"
          fullWidth
          value={form.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          margin="dense"
          name="deadline"
          label="Deadline"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={form.deadline}
          onChange={handleChange}
          error={!!errors.deadline}
          helperText={errors.deadline}
        />
        <TextField
          margin="dense"
          name="status"
          label="Status"
          select
          fullWidth
          value={form.status}
          onChange={handleChange}
          error={!!errors.status}
          helperText={errors.status}
        >
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "#0a4768" }}>
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#0a4768",
            "&:hover": { backgroundColor: "#083954" },
          }}
        >
          {initialData ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
