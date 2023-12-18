import React, { useState } from 'react';
import '../../Pages/CSS/empDelete.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function EmpDelete() {
  const [employeeId, setEmployeeId] = useState('');
  const [idError, setIdError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  function handleChange(e) {
    const { value } = e.target;
    setEmployeeId(value);

    const idRegex = /^[0-9]+$/;
    if (!idRegex.test(value)) {
      setIdError('ID should only contain numbers');
    } else {
      setIdError('');
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    if (idError) {
      console.log('Validation Error:', idError);
      return;
    }

    console.log('Employee Deleted with ID:', employeeId);

    // Send deletion email
    try {
      const response = await sendDeleteEmail(employeeId);
      if (response.ok) {
        setDeleteSuccess(true);
      } else {
        console.error('Failed to send delete email.');
      }
    } catch (error) {
      console.error('Error sending delete email:', error);
    }
  }

  async function sendDeleteEmail(id) {
    const response = await fetch('http://localhost:3001/sendDeleteEmaill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        email: 'karthi.blogger.avatar@gmail.com', // Replace with recipient's email
      }),
    });
    return response;
  }

  return (
    <div className="emp-delete-container">
      <Header />
      <Sidebar />
      <h2 className="emp-delete-title">Delete Employee</h2>
      <form onSubmit={handleDelete} className="emp-delete-form">
        <label className="emp-delete-label">
          Enter Employee ID:
          <input
            type="text"
            value={employeeId}
            onChange={handleChange}
            className={`emp-delete-input ${idError && 'error'}`}
            required
          />
          {idError && <p className="error-message">{idError}</p>}
        </label>
        <br />
        <button type="submit" className="emp-delete-button">
          Delete Employee
        </button>
      </form>
      {deleteSuccess && (
        <div className="delete-success-message">
          Employee deleted!!!
        </div>
      )}
      <Footer />
    </div>
  );
}

export default EmpDelete;
