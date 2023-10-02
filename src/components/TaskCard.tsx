import React from 'react';
import { Card, CardContent, Checkbox, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
    task: {
        _id: string;
        description: string;
        completed: boolean;
    };
    toggleComplete: () => void;
    deleteTask: () => void;
}

const TaskCard: React.FC<Props> = ({ task, toggleComplete, deleteTask }) => {
    return (
        <Card>
            <CardContent>
                <Checkbox checked={task.completed} onChange={toggleComplete} />
                {task.description}
                <IconButton onClick={deleteTask}><DeleteIcon /></IconButton>
                <IconButton><EditIcon /></IconButton>
            </CardContent>
        </Card>
    );
}

export default TaskCard;
