import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

const MainPage: React.FC = () => {
    const [tasks, setTasks] = useState<any[]>([]); // or define a Task type/interface

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        // Assuming you have an API endpoint to get tasks of the logged-in user
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
    };

    const addTask = async (description: string) => {
        const response = await axios.post('/api/tasks', { description });
        setTasks([...tasks, response.data]);
    };

    const toggleComplete = async (id: string) => {
        const task = tasks.find(t => t._id === id);
        if (task) {
            const updatedTask = { ...task, completed: !task.completed };
            await axios.put(`/api/tasks/${id}`, updatedTask);
            fetchTasks();
        }
    };

    const deleteTask = async (id: string) => {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="main-page">
            <TaskForm addTask={addTask} />
            {tasks.map(task => (
                <TaskCard
                    key={task._id}
                    task={task}
                    toggleComplete={() => toggleComplete(task._id)}
                    deleteTask={() => deleteTask(task._id)}
                />
            ))}
        </div>
    );
}

export default MainPage;
