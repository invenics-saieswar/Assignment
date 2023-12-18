import React, { useState } from 'react';
import '../../Pages/CSS/empAdd.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function EmpAdd() {
  const [employeeData, setEmployeeData] = useState({
    id: '',
    name: '',
    role: '',
    department: '',
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [nameError, setNameError] = useState('');
  const [idError, setIdError] = useState('');
  const [formError, setFormError] = useState('');

  const roles = ['Director', 'Manager', 'Analyst'];
  const departments = ['Automation', 'SAP', 'App Dev', 'Product'];

  function handleChange(e) {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validation for the name field
    if (name === 'name') {
      const nameRegex = /^[a-zA-Z ]*$/;
      if (!nameRegex.test(value)) {
        setNameError('Name should only contain letters and spaces');
      } else {
        setNameError('');
      }
    }

    // Validation for the id field
    if (name === 'id') {
      const idRegex = /^[0-9]+$/;
      if (!idRegex.test(value)) {
        setIdError('ID should only contain numbers');
      } else {
        setIdError('');
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!employeeData.id || !employeeData.name || !employeeData.role || !employeeData.department) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (nameError || idError) {
      setFormError('Please fix the validation errors before submitting.');
      return;
    }

    async function sendEmailNotification() {
      try {
        const response = await fetch('http://localhost:3001/sendaddEmp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: employeeData.name,
            id: employeeData.id,
            role: employeeData.role,
            department: employeeData.department,
            email: 'karthi.blogger.avatar@gmail.com', // Replace 'recipient@example.com' with the recipient's email
          }),
        });

        if (response.ok) {
          console.log('Email sent successfully!');
        } else {
          console.error('Failed to send email.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }

    sendEmailNotification();

    setShowSuccessMessage(true);

    setEmployeeData({
      id: '',
      name: '',
      role: '',
      department: '',
    });

    setNameError('');
    setIdError('');
    setFormError('');
  }

  return (
    <div className="emp-add-container">
      <Header />
      <Sidebar />
      <h2 className="emp-add-title">Add Employee Details</h2>
      <form onSubmit={handleSubmit} className="emp-add-form">
        {/* Existing form elements and JSX */}
          {formError && <p className="error-message">{formError}</p>}
        <div className="emp-add-input-group">
          <label className="emp-add-label">Employee ID:</label>
          <input
            type="text"
            name="id"
            value={employeeData.id}
            onChange={handleChange}
            className={`emp-add-input emp-add-input-id ${idError && 'error'}`}
            required
          />
          {idError && <p className="error-message">{idError}</p>}
        </div>
        <div className="emp-add-input-group">
          <label className="emp-add-label">Name:</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            className={`emp-add-input emp-add-input-name ${nameError && 'error'}`}
            required
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </div>
        <div className="emp-add-input-group">
          <label className="emp-add-label">Role:</label>
          <select
            name="role"
            value={employeeData.role}
            onChange={handleChange}
            className="emp-add-input emp-add-input-role"
            required
          >
            <option value="">Select Role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="emp-add-input-group">
          <label className="emp-add-label">Department:</label>
          <select
            name="department"
            value={employeeData.department}
            onChange={handleChange}
            className="emp-add-input emp-add-input-department"
            required
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
        <button type="submit" className="emp-add-button-submit">
          Add Employee
        </button>
      </form>
      {showSuccessMessage && (
        <div className="emp-add-success-message">Employee details added successfully!</div>
      )}
      <Footer />
    </div>
  );
}

export default EmpAdd;
