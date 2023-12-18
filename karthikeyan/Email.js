// Email.js

import React, { useState } from 'react';
import axios from 'axios';
import '../../Pages/CSS/Email.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const EmailForm = () => {
  // State variables for name, email, email validation, notification messages, and notifications display
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [notificationMessages, setNotificationMessages] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // State for managing success and error messages
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Function to toggle display of notifications
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Function to display success message
  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // Hide success message after 3 seconds
  };

  // Function to display error message
  const showError = () => {
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000); // Hide error message after 3 seconds
  };

  // Function to handle sending email
  const handleEmailSend = async () => {
    try {
      const response = await axios.post('http://localhost:3001/sendEmail', { name, email });
      setNotificationMessages([...notificationMessages, `Mail sent successfully to ${name}`]);
      console.log('Response from server:', response.data);
      showSuccess(); // Display success message
    } catch (error) {
      setNotificationMessages([...notificationMessages, `Failed to send mail to ${name}`]);
      console.error('Error sending email:', error);
      showError(); // Display error message
    }
  };

  // Function to handle changes in the name input field
  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName);
  };

  // Function to handle changes in the email input field and validate email pattern
  const handleInputChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(inputEmail));
  };

  return (
    <>
      <Header
        handleNotificationClick={toggleNotifications}
        notificationMessages={notificationMessages}
        showNotifications={showNotifications}
      />
      <Sidebar />

      <div className="form-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
            className="name-input"
          />
        </div>

        <div className="input-container">
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={handleInputChange}
            className={isValidEmail ? 'email-input' : 'email-input invalid-email'}
          />
          {!isValidEmail && (
            <p className="error-message">Please enter a valid email address.</p>
          )}
        </div>

        <button
          onClick={async () => {
            try {
              await handleEmailSend();
            } catch (error) {
              console.error('Error sending email:', error);
            }
          }}
          className="send-email-button"
          disabled={!isValidEmail || !name || !email}
        >
          Send
        </button>

        {showSuccessMessage && (
          <div className="message-popup success">
            <p>Email sent successfully!</p>
          </div>
        )}

        {showErrorMessage && (
          <div className="message-popup error">
            <p>Failed to send email.</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default EmailForm;
