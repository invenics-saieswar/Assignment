import React, { useState } from 'react';
import '../../Pages/CSS/deptView.css';
import Header from './Header'; // Importing components
import Sidebar from './Sidebar';
import Footer from './Footer';
 
function DeptView() {
  const [departmentId, setDepartmentId] = useState('');
  const [departmentData, setDepartmentData] = useState(null);
  const [idError, setIdError] = useState('');
 
  function handleChange(e) {
    const { value } = e.target;
 
    // Validation for the ID field
    const idRegex = /^[0-9]+$/; // Allow only numbers
    if (!idRegex.test(value)) {
      setIdError('ID should only contain numbers');
    } else {
      setIdError('');
    }
 
    setDepartmentId(value);
  }
 
  function handleView(e) {
    e.preventDefault();
 
    // Check if there are validation errors
    if (idError) {
      console.log('Validation Error:', idError);
      return;
    }
 
    const fetchedDepartmentData = fetchDepartmentDataById(departmentId);
    setDepartmentData(fetchedDepartmentData);
  }
 
  function fetchDepartmentDataById(id) {
    return {
      id,
      name: 'App Dev',
    };
  }
 
  return (
    <div className="dept-view-container">
      <Header/>
        <Sidebar/>
      <h2 className="dept-view-title">View Department Details</h2>
      <form onSubmit={handleView} className="dept-view-form">
        <label className="dept-view-label">
          Enter Department ID:
          <input
            type="text"
            value={departmentId}
            onChange={handleChange}
            className={`dept-view-input `}
            required
          />
          {idError && <p className="error-message">{idError}</p>}
        </label>
        <br />
        <button type="submit" className="dept-view-button-submit">
          View Department
        </button>
      </form>
 
      {departmentData && (
        <div className="dept-view-details">
          <h3>Department Details</h3>
          <table className="dept-view-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{departmentData.id}</td>
                <td>{departmentData.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <Footer/>
    </div>
  );
}
 
export default DeptView;
 