// src/components/UpdateDelete.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateDelete.css';

const UpdateDelete = ({ task, onUpdateDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completedDate, setCompletedDate] = useState('');

  useEffect(() => {
    // Update state with task details when component mounts
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setDueDate(task.dueDate);
      setCompletedDate(task.completedDate);
    }
  }, [task]);

  const handleUpdate = async () => {
    try {
      const updatedTask = {
        taskId: task.taskId,
        title,
        description,
        status,
        dueDate,
        completedDate,
        username: localStorage.getItem('username')
      };

      const response = await axios.put(`https://localhost:7222/api/Tasks/${task.taskId}`, updatedTask);
      alert('Task updated successfully');
      window.location.reload();

    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7222/api/Tasks/RemoveTask/${task.taskId}`);
      alert('Task deleted successfully');

      onUpdateDelete(task.taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className={`update-delete-container ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Status:</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />

          <label>Due Date:</label>
          <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

          <label>Completed Date:</label>
          <input type="datetime-local" value={completedDate} onChange={(e) => setCompletedDate(e.target.value)} />

          <button className="update-button" onClick={handleUpdate}>Update</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default UpdateDelete;
