import React, { Fragment, useState } from "react";

const InputTask = () => {
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("* * * * *");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description, schedule };
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center mt-5'>Input Task</h1>

      <form onSubmit={onSubmitForm}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder='Schedule'
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          AddTask
        </button>
      </form>
    </Fragment>
  );
};

export default InputTask;
