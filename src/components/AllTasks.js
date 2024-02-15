// src/components/AllTasks.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateDelete from './UpdateDelete';
import './AllTasks.css';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://localhost:7222/api/Tasks/GetAllTasks');
        setTasks(response.data);
      } catch (error) {
        setError('Error fetching tasks. Please try again.');
      }
    };

    fetchTasks();
  }, []);

  const handleUpdateDelete = async (taskId) => {
    try {
      // Refresh the tasks list after update or delete
      const updatedTasks = tasks.filter(task => task.taskId !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error handling update or delete:', error);
    }
  };

  return (
    <div className="all-tasks-container">
      <h2>All Tasks</h2>
      {error && <p className="error">{error}</p>}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.taskId} className="task-item">
            <strong>Title:</strong> {task.title}<br />
            <strong>Description:</strong> {task.description}<br />
            <strong>Status:</strong> {task.status}<br />
            <strong>Created Date:</strong> {new Date(task.createdDate).toLocaleString()}<br />
            <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}<br />
            {task.completedDate && (
              <div>
                <strong>Completed Date:</strong> {new Date(task.completedDate).toLocaleString()}<br />
              </div>
            )}
       
            {/* Pass task details to UpdateDelete component */}
            <UpdateDelete task={task} onUpdateDelete={handleUpdateDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTasks;
