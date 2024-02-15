// src/components/ViewAllTasks.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAllTasks.css'

const ViewAllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    axios.get('https://localhost:7222/api/Tasks/GetAllTasks')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container">
      <h1>All Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.taskId}>
            <h3>{task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Created Date: {new Date(task.createdDate).toLocaleString()}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleString()}</p>
            <p>Status: {task.status}</p>
            <p>Completed Date: {task.completedDate ? new Date(task.completedDate).toLocaleString() : 'Not completed'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAllTasks;
