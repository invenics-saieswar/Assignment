import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../Pages/CSS/deptDelete.css';
import Header from './Header';

function DeptDelete() {
  const [departmentId, setDepartmentId] = useState('');
  const [idError, setIdError] = useState('');

  function handleChange(e) {
    const { value } = e.target;

    // Validation for the ID field
    const idRegex = /^[0-9]+$/; // Allow only numbers
    if (!idRegex.test(value)) {
      setIdError('Please enter a valid numeric ID.');
    } else {
      setIdError('');
    }

    setDepartmentId(value);
  }

  async function handleDelete(e) {
    e.preventDefault();

    // Check for validation errors before deleting
    if (idError) {
      console.log('Validation error. Please fix it before deleting.');
      return;
    }

    try {
      const response = await sendDeleteDepartmentEmail(departmentId);
      if (response.ok) {
        console.log('Department delete email sent successfully!');
        // Handle further actions or success messages here
      } else {
        console.error('Failed to send department delete email.');
      }
    } catch (error) {
      console.error('Error sending department delete email:', error);
    }

    // Simulate the deletion process
    console.log('Department Deleted with ID:', departmentId);

    // Reset the form
    setDepartmentId('');
    setIdError('');
  }

  async function sendDeleteDepartmentEmail(departmentId) {
    const response = await fetch('http://localhost:3001/sendDeptDeleteEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: departmentId,
        email: 'karthi.blogger.avatar@gmail.com', // Replace with recipient's email
      }),
    });
    return response;
  }

  return (
    <div className="dept-delete-container">
      <Header/>
      <Sidebar />
      <h2 className="dept-delete-title">Delete Department</h2>
      <form onSubmit={handleDelete} className="dept-delete-form">
        <label className="dept-delete-label">
          Enter Department ID:
          <input
            type="text"
            value={departmentId}
            onChange={handleChange}
            className={`dept-delete-input ${idError && 'error'}`}
            required
          />
        </label>
        {idError && <p className="error-message">{idError}</p>}
        <br />
        <button type="submit" className="dept-delete-button">
          Delete Department
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default DeptDelete;
