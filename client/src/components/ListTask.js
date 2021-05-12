import React, { Fragment, useState, useEffect } from "react";
import cron from "node-cron";

let T = null;

const ListTask = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const jsonData = await response.json();
      setTasks(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const deleteTask = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.task_id !== id));
      T = tasks.filter((task) => task.task_id === id);
      console.log(T);

      console.log(`task ${T[0].task_id} : ${T[0].description} is deleted`);
      //   window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const startTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`);
      const jsonData = await response.json();
      console.log(jsonData);
      T = jsonData;
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Fragment>
      <h1 className='text-center mt-5'>TaskList</h1>
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Schedule</th>
            <th>Start</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.task_id}>
              <td>{task.description}</td>
              <td>
                {/* <EditTodo task={task} /> */}
                {task.schedule}
              </td>
              <td>
                <button
                  className='btn btn-success'
                  onClick={() => startTask(task.task_id)}
                >
                  Start
                </button>
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteTask(task.task_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTask;
