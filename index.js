const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const PORT = process.env.PORT || 5000



/* <----middleware-----> */
app.use(cors());
app.use(express.json()); //req.body

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}

/* <----routes-----> */
//create todo
app.post("/todos", async(req, res) => {
    //await
    try {
        const { description } = req.body;
        const newTodo = await pool.query("insert into todo (description) values($1) returning *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
//get all todos
app.get("/todos", async(_, res) => {
    try{
        const allTodos = await pool.query("select * from todo");
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
})

//get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("select * from todo where todo_id = $1", [id]);
        res.json(todo.rows)
    } catch (err) {
        console.error(err.message);
    }
})

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const _ = await pool.query("update todo set description = $1 where todo_id = $2", [description, id]);
        res.json("todo was updated")
    } catch (err) {
        console.error(err.message);
    }
})

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const _ = await pool.query("delete from todo where todo_id = $1", [id]);
        res.json("todo was deleted")
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})