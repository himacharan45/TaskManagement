// src/components/AddTask.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './AddTask.css'; // Import the CSS file

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    createdDate: new Date().toISOString().slice(0, 16),
    dueDate: new Date().toISOString().slice(0, 16),
    status: '',
    completedDate: null,
    username: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setTaskData((prevTaskData) => ({
        ...prevTaskData,
        username: storedUsername
      }));
    }
  }, []); // Run only once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '' // Clear error message when input changes
    }));
    setMessage('');
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      completedDate: checked ? new Date().toISOString().slice(0, 16) : null
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!taskData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!taskData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!taskData.status.trim()) {
      newErrors.status = 'Status is required';
    }

    if (!taskData.dueDate) {
      newErrors.dueDate = 'Due Date is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Make a POST request using Axios
        const response = await axios.post('https://localhost:7222/api/Tasks/AddTask', taskData);

        // Check the response status
        if (response.status === 200) {
          setMessage('Task added successfully!');
          // Clear the form or redirect to another page if needed
          setTaskData({
            title: '',
            description: '',
            createdDate: new Date().toISOString().slice(0, 16),
            dueDate: new Date().toISOString().slice(0, 16),
            status: '',
            completedDate: null,
            username: taskData.username // Preserve the username for the next task
          });
        } else {
          setMessage(`Failed to add task: ${response.data}`);
        }
      } catch (error) {
        setMessage(`Error adding task: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <h2>Add New Task</h2>
      {message && <p className={message.startsWith('Task added') ? 'success' : 'error'}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            required
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={taskData.status}
            onChange={handleInputChange}
            required
          />
          {errors.status && <p className="error">{errors.status}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleInputChange}
            required
          />
          {errors.dueDate && <p className="error">{errors.dueDate}</p>}
        </div>

        <div className="form-group">
          <label>
            Completed:
            <input type="checkbox" name="completed" onChange={handleCheckboxChange} />
          </label>
        </div>

        {taskData.completedDate && (
          <div className="form-group">
            <label>Completed Date: {taskData.completedDate}</label>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={taskData.username}
            readOnly
          />
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
