// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Task Management Application</h1>
      
      <div>
        <p>Explore our featured tasks and get started!</p>
      </div>

      <Link to="/ViewAllTasks">
        <button className="view-tasks-button">View Tasks</button>
      </Link>
    </div>
  );
};

export default Home;
