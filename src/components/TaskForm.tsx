import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

interface Props {
    addTask: (desc: string) => void;
}

const TaskForm: React.FC<Props> = ({ addTask }) => {
    const [task, setTask] = useState('');

    const handleSubmit = () => {
        if (task) {
            addTask(task);
            setTask('');
        }
    };

    return (
        <div>
            <TextField value={task} onChange={e => setTask(e.target.value)} placeholder="New task..." />
            <Button onClick={handleSubmit}>Add</Button>
        </div>
    );
}

export default TaskForm;
