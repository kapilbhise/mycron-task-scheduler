const express = require("express");
const cors = require("cors");
const pool = require("./db");
const cron = require("node-cron");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
let id = null;
var t = null;

//Routes

//create a task
app.post("/tasks", async (req, res) => {
  try {
    const { description, schedule } = req.body;
    const newTask = await pool.query(
      "insert into task (description, schedule) values($1, $2) returning *",
      [description, schedule]
    );
    t = newTask.rows[0];
    // console.log(newTask.rows[0]);
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await pool.query("select * from task");
    // console.log(tasks.rows)
    res.send(tasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// schedule a task and start a task
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await pool.query("select * from task where task_id=$1", [id]);
    t = job.rows[0];
    // console.log(job.rows[0].schedule);
    const task = cron.schedule(
      job.rows[0].schedule,
      () => {
        console.log(
          `task ${job.rows[0].task_id} : ${job.rows[0].description} is scheduled and started`
        );
      },
      {
        scheduled: false,
      }
    );

    console.log(task);
    task.start();
    res.send({
      message: `task ${job.rows[0].task_id} : ${job.rows[0].description} is scheduled and started`,
    });
  } catch (err) {
    console.error(err.message);
  }
});

//delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    let { id } = req.params;

    // const job = await pool.query("select * from task where task_id=$1", [
    //   id,
    // ]);
    // console.log(job.rows[0]);
    // const task = cron.schedule(
    //   job.rows[0].schedule,
    //   () => {
    //     console.log(`task ${job.rows[0].task_id} is scheduled and satrted`);
    //   },
    //   {
    //     scheduled: true,
    //   }
    // );

    // task.destroy();
    const deleteTask = await pool.query("delete from task where task_id=$1", [
      id,
    ]);

    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// //Routes

// //create a todo
// app.post("/todos", async (req, res) => {
//   try {
//     // const { description } = req.body;
//     // const newTodo = await pool.query(
//     //   "insert into todo (description) values($1) returning *",
//     //   [description]
//     // );

//     // res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //get all todo
// app.get("/todos", async (req, res) => {
//   try {
//     // const allTodos = await pool.query("select * from todo");
//     // res.json(allTodos.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //get a todo
// app.get("/todos/:id", async (req, res) => {
//   try {
//     // let { id } = req.params;
//     // const todo = await pool.query("select * from todo where todo_id=$1", [id]);
//     // res.json(todo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //update a todo
// app.put("/todos/:id", async (req, res) => {
//   try {
//     // let { id } = req.params;
//     // let { description } = req.body;
//     // const updateTodo = await pool.query(
//     //   "update todo set description=$1 where todo_id=$2",
//     //   [description, id]
//     // );

//     // res.json("Todo was updated");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //delete a todo
// app.delete("/todos/:id", async (req, res) => {
//   try {
//     // let { id } = req.params;
//     // const deleteTodo = pool.query("delete from todo where todo_id=$1", [id]);

//     // res.json("Todo was deleted");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //schedule a job
// app.get("/schedulejobs/:id",async (req, res) => {
//   try {
//     let { id } = req.params;
//     const task = await pool.query("select * from task where task_id=$1", [id]);
//     console.log(task.schedule)
//     task = cron.schedule(
//       task.schedule,
//       () => {
//         console.log(`task ${id} is scheduled`);
//       },
//       {
//         scheduled: false,
//       }
//     );

//     res.send({
//       message: `job ${id} scheduled`,
//     });

//     // const allTodos = await pool.query("select * from todo");
//     // res.json(allTodos.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });
