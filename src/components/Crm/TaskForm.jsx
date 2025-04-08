import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const TaskForm = ({ isOpen, onClose, onSave, task }) => {
    const [formData, setFormData] = useState({
        title: task?.title || "",
        dueDate: task?.dueDate || "",
        priority: task?.priority || "Medium",
        assignee: task?.assignee || "",
        status: task?.status || "Pending",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{
            style: {
                backgroundColor: "#1e1e2e",
                color: "#ffffff",
                borderRadius: "10px"
            }
        }}>
            <DialogTitle style={{ color: "#bb86fc", fontWeight: "bold" }}>{task ? "Edit Task" : "Add Task"}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        label="Title"
                        name="title"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                        required
                        margin="normal"
                        InputLabelProps={{ style: { color: "#bb86fc" } }}
                        sx={{
                            input: { color: "#fff" },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: "#bb86fc" },
                                '&:hover fieldset': { borderColor: "#d0aaff" },
                                '&.Mui-focused fieldset': { borderColor: "#d0aaff" }
                            }
                        }}
                    />
                    <TextField
                        label="Due Date"
                        name="dueDate"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true, style: { color: "#bb86fc" } }}
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                        margin="normal"
                        sx={{ input: { color: "#fff" } }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel style={{ color: "#bb86fc" }}>Priority</InputLabel>
                        <Select 
                            name="priority" 
                            value={formData.priority} 
                            onChange={handleChange} 
                            sx={{ color: "#fff", borderColor: "#bb86fc" }}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Assignee"
                        name="assignee"
                        fullWidth
                        value={formData.assignee}
                        onChange={handleChange}
                        required
                        margin="normal"
                        InputLabelProps={{ style: { color: "#bb86fc" } }}
                        sx={{ input: { color: "#fff" } }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel style={{ color: "#bb86fc" }}>Status</InputLabel>
                        <Select 
                            name="status" 
                            value={formData.status} 
                            onChange={handleChange} 
                            sx={{ color: "#fff", borderColor: "#bb86fc" }}
                        >
                            <MenuItem value="To Do">To Do</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Done">Done</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" style={{ borderColor: "#bb86fc", color: "#bb86fc" }}>
                    Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit} variant="contained" style={{ backgroundColor: "#bb86fc", color: "#1e1e2e" }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskForm;
