import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { FaTrash } from "react-icons/fa";
import TaskForm from "./TaskForm"; // Import TaskForm
import "../styles/Task.css";

const API_URL = "http://localhost:8000/api/tasks";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(API_URL);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const handleOpenForm = (task = null) => {
        setSelectedTask(task);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedTask(null);
    };

    const handleSaveTask = async (taskData) => {
        try {
            if (selectedTask) {
                // Update existing task
                const response = await axios.put(`${API_URL}/${selectedTask._id}`, taskData);
                setTasks((prev) => prev.map((task) => (task._id === selectedTask._id ? response.data : task)));
            } else {
                // Add new task
                const response = await axios.post(API_URL, taskData);
                setTasks((prev) => [...prev, response.data]);
            }
            handleCloseForm();
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`${API_URL}/${taskId}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleTaskDrop = useCallback(async (taskId, newStatus) => {
        try {
            const response = await axios.put(`${API_URL}/${taskId}`, { status: newStatus });
            setTasks((prevTasks) => prevTasks.map((task) => (task._id === taskId ? response.data : task)));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }, []);

    const columns = ["To Do", "In Progress", "Done"];

    return (
        <div className="task-section">
            <div className="task-header">
                <h1 className="task-title">Tasks</h1>
                <button className="add-task-button" onClick={() => handleOpenForm(null)}>+ Add Task</button>
            </div>

            <div className="task-columns">
                {columns.map((column) => (
                    <Column
                        key={column}
                        column={column}
                        tasks={tasks.filter((task) => task.status === column)}
                        onTaskDrop={handleTaskDrop}
                        onDeleteTask={handleDeleteTask}
                        onEditTask={handleOpenForm}
                    />
                ))}
            </div>

            {/* Task Form Modal */}
            <TaskForm isOpen={showForm} onClose={handleCloseForm} onSave={handleSaveTask} task={selectedTask} />
        </div>
    );
};

const Column = ({ column, tasks, onTaskDrop, onDeleteTask, onEditTask }) => {
    const columnRef = useRef(null);

    useEffect(() => {
        const el = columnRef.current;
        if (!el) return;

        const cleanup = dropTargetForElements({
            element: el,
            getData: () => ({ status: column }),
            onDrop({ source }) {
                if (source?.data?.taskId) {
                    onTaskDrop(source.data.taskId, column);
                }
            },
        });

        return cleanup;
    }, [column, onTaskDrop]);

    return (
        <div className="task-column" ref={columnRef}>
            <h2 className="column-title">{column}</h2>
            <div className="task-list">
                {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} onDelete={onDeleteTask} onEdit={onEditTask} />
                ))}
            </div>
        </div>
    );
};

const TaskCard = ({ task, onDelete, onEdit }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        const cleanup = draggable({
            element: el,
            getInitialData: () => ({ taskId: task._id }),
            onDragStart() {
                el.classList.add("dragging");
            },
            onDrop() {
                el.classList.remove("dragging");
            },
            onDragCancel() {
                el.classList.remove("dragging");
            },
        });

        return cleanup;
    }, [task._id]);

    return (
        <div className="task-card" ref={cardRef}>
            <div className="task-header">
                <span className="task-name">{task.title}</span>
                <div className="task-actions">
                    <button onClick={() => onEdit(task)}>✏️</button>
                    <button className="delete-task-button" onClick={() => onDelete(task._id)}>
                        <FaTrash />
                    </button>
                </div>
            </div>
            <div className="task-details">
                <span className="task-date">Due date: {task.dueDate}</span>
            </div>
            <div className="task-footer">
                <span className={`task-priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                <span className="task-assignee">Assigned to: {task.assignee}</span>
            </div>
        </div>
    );
};

export default TaskBoard;
