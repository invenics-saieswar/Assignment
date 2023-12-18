import React from 'react';
import { FaRegBell } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import '../../Pages/CSS/Header.css';

const Header = ({ handleNotificationClick, notificationMessages, showNotifications }) => {
  const toggleNotifications = () => {
    handleNotificationClick();
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Project Management</h1>
        <div className="header-icons">
          <FaRegBell className="header-icon bell-icon" onClick={toggleNotifications} />
          <CgProfile className="header-icon profile-icon" />
          <div className="notification-box" style={{ display: showNotifications ? 'block' : 'none' }}>
            {notificationMessages && notificationMessages.length > 0 ? (
              <ul>
                {notificationMessages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            ) : (
              <p>No notifications</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
