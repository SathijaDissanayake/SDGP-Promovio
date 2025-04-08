import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { FaTrash } from "react-icons/fa";
import TaskForm from "./TaskForm"; // Import TaskForm

const API_URL = "http://localhost:8000/api/v1/tasks";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([
        { _id: "1", title: "Design UI Mockups", status: "To Do", dueDate: "2025-04-01", priority: "High", assignee: "Alice" },
        { _id: "2", title: "Develop API Endpoints", status: "In Progress", dueDate: "2025-03-25", priority: "Medium", assignee: "Bob" },
        { _id: "3", title: "Write Documentation", status: "Done", dueDate: "2025-03-20", priority: "Low", assignee: "Charlie" }
    ]);
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
                const response = await axios.put(`${API_URL}/${selectedTask._id}`, taskData);
                setTasks((prev) => prev.map((task) => (task._id === selectedTask._id ? response.data : task)));
            } else {
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
        <div className="p-6 max-w-6xl mx-auto rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Tasks</h1>
                <button 
                    className="bg-gray-800 text-gray-300 px-5 py-2 rounded-lg font-small transition hover:bg-gray-700"
                    onClick={() => handleOpenForm(null)}
                >
                    + Add Task
                </button>
            </div>

            <div className="grid grid-cols-3 gap-10">
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
        <div className="bg-zinc-700 p-4 rounded-lg shadow-md" ref={columnRef}>
            <h2 className="text-xl font-semibold text-gray-300 mb-3">{column}</h2>
            <div className="flex flex-col gap-4">
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
                el.classList.add("opacity-50");
            },
            onDrop() {
                el.classList.remove("opacity-50");
            },
            onDragCancel() {
                el.classList.remove("opacity-50");
            },
        });

        return cleanup;
    }, [task._id]);

    return (
        <div className="bg-zinc-900 p-4 rounded-lg shadow-md hover:-translate-y-1 hover:shadow-gray-400/30 transition" ref={cardRef}>
            <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-white">{task.title}</span>
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-gray-200 transition">✏️</button>
                    <button className="text-red-500 hover:text-red-600 transition" onClick={() => onDelete(task._id)}>
                        <FaTrash />
                    </button>
                </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">Due date: {task.dueDate}</div>
            <div className="flex items-center mt-2 space-x-3">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${task.priority === "High" ? "bg-red-600" : task.priority === "Medium" ? "bg-yellow-600" : "bg-green-600"}`}>{task.priority}</span>
                <span className="text-xs text-gray-300">Assigned to: {task.assignee}</span>
            </div>
        </div>
    );
};

export default TaskBoard;
