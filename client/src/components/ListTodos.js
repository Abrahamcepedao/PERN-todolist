import React, { useEffect, useState } from 'react'

//components
import EditTodo from './EditTodo'

export default function ListTodos() {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        try {
            const response = await fetch("/todos")
            const jsonData = await response.json()
            console.log(jsonData)
            setTodos(jsonData)
        } catch (err) {
            console.error(err.message)
        }
        
    }

    useEffect(() => {
        fetchTodos();
    },[])

    const handleDelete = async(id) => {
        try {
            const response = await fetch(`/todos/${id}`, {
                method: "DELETE"
            })
            console.log(response)
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message)
        }
    }
    const handleEdit = (item) => {

    }

    return (
        <div>
            <h1>list todos</h1>
            {todos.length !== 0 && todos.map((item, i) => (
                <div key={i}>
                    <h2>{item.description}</h2>
                    <button onClick={() => { handleDelete(item.todo_id)}}>delete</button>
                    <EditTodo/>
                </div>
            ))}
        </div>
    )
}
