import React, { useState } from 'react';
import '../../Pages/CSS/empUpdate.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function EmpUpdate() {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeData, setEmployeeData] = useState(null);
  const [idError, setIdError] = useState('');
  const [nameError, setNameError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const roles = ['Director', 'Manager', 'Analyst'];
  const departments = ['Automation', 'SAP', 'App Dev', 'Product'];

  function handleChangeId(e) {
    const { value } = e.target;
    const idRegex = /^[0-9]+$/;
    if (!idRegex.test(value)) {
      setIdError('ID should only contain numbers');
    } else {
      setIdError('');
    }
    setEmployeeId(value);
  }

  async function handleFetchEmployee(e) {
    e.preventDefault();
    if (idError) {
      console.log('Validation Error:', idError);
      return;
    }
    const fetchedEmployeeData = await fetchEmployeeDataById(employeeId);
    setEmployeeData(fetchedEmployeeData);
  }

  function handleChangeField(e) {
    const { name, value } = e.target;
    if (name === 'name') {
      const nameRegex = /^[a-zA-Z ]*$/;
      if (!nameRegex.test(value)) {
        setNameError('Invalid name');
      } else {
        setNameError('');
      }
    }
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (idError || nameError) {
      console.log('Validation Error(s):', idError, nameError);
      return;
    }
    console.log('Employee Data Updated:', employeeData);

    // Send email on update
    try {
      const response = await sendUpdateEmail(employeeData);
      if (response.ok) {
        setUpdateSuccess(true);
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async function fetchEmployeeDataById(id) {
    // Simulating fetching employee data from API
    return {
      id,
      name: 'Akshara',
      role: 'Analyst',
      department: 'App Dev',
    };
  }

  async function sendUpdateEmail(data) {
    const response = await fetch('http://localhost:3001/sendUpdateEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        role: data.role,
        department: data.department,
        email: 'karthi.blogger.avatar@gmail.com', // Replace with recipient's email
      }),
    });
    return response;
  }

  return (
    <div className="emp-update-container">
      <Header />
      <Sidebar />
      <h2 className="emp-update-title">Update Employee Details</h2>
      <form onSubmit={handleFetchEmployee} className="emp-update-form">
        {/* Form for fetching employee data */}
        <div className="emp-update-input-group">
          <label className="emp-update-label">Enter Employee ID:</label>
          <input
            type="text"
            value={employeeId}
            onChange={handleChangeId}
            className={`emp-update-input emp-update-input-id ${idError && 'error'}`}
            required
          />
          {idError && <p className="error-message">{idError}</p>}
        </div>
        <br />
        <button type="submit" className="emp-update-button-submit">
          Fetch Employee
        </button>
      </form>

      {employeeData && (
        <form onSubmit={handleUpdate} className="emp-update-form">
          {/* Form for updating employee data */}
          <div className="emp-update-input-group">
            <label className="emp-update-label">Name:</label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChangeField}
              className={`emp-update-input emp-update-input-name ${nameError && 'error'}`}
            />
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
          <br />
          <div className="emp-update-input-group">
            <label className="emp-update-label">Role:</label>
            <select
              name="role"
              value={employeeData.role}
              onChange={handleChangeField}
              className="emp-update-input emp-update-input-role"
            >
              <option value="">Select Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="emp-update-input-group">
            <label className="emp-update-label">Department:</label>
            <select
              name="department"
              value={employeeData.department}
              onChange={handleChangeField}
              className="emp-update-input emp-update-input-department"
            >
              <option value="">Select Department</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <br />
          <button type="submit" className="emp-update-button-submit">
            Update Employee
          </button>
        </form>
      )}
      {updateSuccess && (
        <div className="update-success-message">
          Employee details updated! Email sent successfully.
        </div>
      )}
      <Footer />
    </div>
  );
}

export default EmpUpdate;
