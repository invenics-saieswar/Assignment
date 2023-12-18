import React, { useState } from 'react';

const NotificationWrapper = ({ children }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [notificationMessages, setNotificationMessages] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // Hide success message after 3 seconds
  };

  const showError = () => {
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000); // Hide error message after 3 seconds
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      {showSuccessMessage && (
        <div className="message-popup success">
          <p>Success Message</p>
        </div>
      )}
      {showErrorMessage && (
        <div className="message-popup error">
          <p>Error Message</p>
        </div>
      )}

      {children && React.Children.map(children, child =>
        React.isValidElement(child) ?
          React.cloneElement(child, {
            showSuccess,
            showError,
            notificationMessages,
            setNotificationMessages,
            showNotifications,
            toggleNotifications,
          }) : null
      )}
    </>
  );
};

export default NotificationWrapper;
