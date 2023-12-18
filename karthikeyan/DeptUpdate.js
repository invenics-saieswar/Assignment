import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../Pages/CSS/deptUpdate.css';

function DeptUpdate() {
  const [departmentId, setDepartmentId] = useState('');
  const [departmentData, setDepartmentData] = useState(null);
  const [idError, setIdError] = useState('');
  const [nameError, setNameError] = useState('');

  function handleChangeId(e) {
    const { value } = e.target;

    const idRegex = /^[0-9]+$/;
    if (!idRegex.test(value)) {
      setIdError('ID should only contain numbers');
    } else {
      setIdError('');
    }
    setDepartmentId(value);
  }

  function handleFetchDepartment(e) {
    e.preventDefault();

    if (idError) {
      console.log('Validation Error:', idError);
      return;
    }

    const fetchedDepartmentData = fetchDepartmentDataById(departmentId);
    setDepartmentData(fetchedDepartmentData);
  }

  function handleChangeField(e) {
    const { name, value } = e.target;

    const nameRegex = /^[a-zA-Z ]*$/;
    if (name === 'name' && !nameRegex.test(value)) {
      setNameError('Invalid Department name');
    } else {
      setNameError('');
    }

    setDepartmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleUpdate(e) {
    e.preventDefault();

    if (idError || nameError) {
      console.log('Validation errors. Please fix them before updating.');
      return;
    }

    try {
      const response = await sendDepartmentUpdateEmail(departmentData.id, departmentData.name);
      if (response.ok) {
        console.log('Department update email sent successfully!');
        // Handle further updates or success messages here
      } else {
        console.error('Failed to send department update email.');
      }
    } catch (error) {
      console.error('Error sending department update email:', error);
    }

    console.log('Department Data Updated:', departmentData);
  }

  function fetchDepartmentDataById(id) {
    return {
      id,
      name: 'App Dev', // Replace with fetched data from your backend
    };
  }

  async function sendDepartmentUpdateEmail(id, name) {
    const response = await fetch('http://localhost:3001/sendDeptUpdateEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        email: 'karthi.blogger.avatar@gmail.com', // Replace with recipient's email
      }),
    });
    return response;
  }

  return (
    <div className="dept-update-container">
      <Header/>
      <Sidebar />
      <h2 className="dept-update-title">Update Department Details</h2>
      <form onSubmit={handleFetchDepartment} className="dept-update-form">
        <div className="dept-update-input-group">
          <label className="dept-update-label">Enter Department ID:</label>
          <input
            type="text"
            value={departmentId}
            onChange={handleChangeId}
            className={`dept-update-input dept-update-input-id ${idError && 'error'}`}
            required
          />
          {idError && <p className="error-message">{idError}</p>}
        </div>
        <br />
        <button type="submit" className="dept-update-button-submit">
          Fetch Department
        </button>
      </form>

      {departmentData && (
        <form onSubmit={handleUpdate} className="dept-update-form">
          <div className="dept-update-input-group">
            <label className="dept-update-label">Name:</label>
            <input
              type="text"
              name="name"
              value={departmentData.name}
              onChange={handleChangeField}
              className={`dept-update-input dept-update-input-name ${nameError && 'error'}`}
            />
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
          <br />
          <button type="submit" className="dept-update-button-submit">
            Update Department
          </button>
        </form>
      )}
      <Footer />
    </div>
  );
}

export default DeptUpdate;
