import React, { Fragment, useState } from 'react'

export default function InputTodo() {
    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
        setDescription("");
    }

    return (
        <Fragment>
            <h1>Pern todo list</h1>
            <form onSubmit={onSubmitForm}>
                <input placeholder="todo" value={description} onChange={(e) => {setDescription(e.target.value)}} type="text"/>
                <button>Add</button>
            </form>
        </Fragment>
    )
}
