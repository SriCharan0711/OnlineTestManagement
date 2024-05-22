import React, { useState } from 'react';
import axios from 'axios';

interface ToDo {
    id: string;
    Name: string;
    Description: string;
    IsComplete: string;
}

const Post: React.FC = () => {
    const [todo, setTodo] = useState<ToDo>({
        id: '',
        Name: '',
        Description: '',
        IsComplete: 'false'
    });
    const [message, setMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTodo(prevTodo => ({ ...prevTodo, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:7116/api/ToDo/postToDo', todo);
            setMessage('ToDo item added successfully.');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage('Error occurred while adding ToDo item.');
                console.error('Axios error:', error.message);
            } else {
                setMessage('Error occurred while adding ToDo item.');
                console.error('Unexpected error:', error);
            }
        }
    };

    return (
        <div className="post-todo">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID:</label>
                    <input
                        type="text"
                        name="id"
                        value={todo.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="Name"
                        value={todo.Name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="Description"
                        value={todo.Description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Is Complete:</label>
                    <select
                        name="IsComplete"
                        value={todo.IsComplete}
                        onChange={handleChange}
                        required
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <button type="submit" >Post ToDo</button>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
};

export default Post;
