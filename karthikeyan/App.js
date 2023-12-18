//App.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing the hook for navigation
import Header from './Pages/JS/Header'; // Importing components
import Sidebar from './Pages/JS/Sidebar';
import Footer from './Pages/JS/Footer';
import './App.css'; // Importing CSS styles

function App() {
  const navigate = useNavigate(); // Initializing the navigation function
  const [notificationMessages, setNotificationMessages] = useState([]); // State for notification messages

  // Function to handle navigation to the project-work route
  const handleProject = () => {
    navigate('/project-work'); // Navigate to '/project-work' when button clicked
  };

  return (
    <div className="App">
      {/* Header Component */}
      <Header notificationMessages={notificationMessages} />
      <div className="main-container">
        {/* Sidebar Component */}
        <Sidebar />
        <div>
          {/* Main Heading */}
          <h1 className="main-heading">Project Management</h1>
          {/* Button for Project Assignment */}
          <div className="button-container">
            <button className="assignment-button" onClick={handleProject}>
              Project Assignment
            </button>
          </div>
        </div>
      </div>
      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default App;
