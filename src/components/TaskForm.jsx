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
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
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
                    />
                    <TextField
                        label="Due Date"
                        name="dueDate"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Priority</InputLabel>
                        <Select name="priority" value={formData.priority} onChange={handleChange}>
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
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select name="status" value={formData.status} onChange={handleChange} variant={"filled"}>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">Cancel</Button>
                <Button type="submit" onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskForm;
