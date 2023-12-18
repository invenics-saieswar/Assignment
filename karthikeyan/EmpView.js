// empView.js
import React, { useState } from 'react';
import '../../Pages/CSS/empView.css';
import Header from './Header'; // Importing components
import Sidebar from './Sidebar';
import Footer from './Footer';
 
 
function EmpView() {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeData, setEmployeeData] = useState(null);
 
  function handleChange(e) {
    setEmployeeId(e.target.value);
  }
 
  function handleView(e) {
    e.preventDefault();
    const fetchedEmployeeData = fetchEmployeeDataById(employeeId);
    setEmployeeData(fetchedEmployeeData);
  }
 
  function fetchEmployeeDataById(id) {
    return {
      id,
      name: 'Akshara',
      role: 'Analyst',
      department: 'App Dev',
    };
  }
 
  return (
    <div className="emp-view-container">
      <Header/>
        <Sidebar/>
      <h2 className="emp-view-title">View Employee Details</h2>
      <form onSubmit={handleView} className="emp-view-form">
        <label className="emp-view-label">
          Enter Employee ID:
          <input type="text" value={employeeId} onChange={handleChange} required/>
        </label>
        <br />
        <button type="submit" className="emp-view-button-submit">
          View Employee
        </button>
      </form>
 
      {employeeData && (
        <div className="emp-view-details">
          <h3>Employee Details</h3>
          <table className="emp-view-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{employeeData.id}</td>
                <td>{employeeData.name}</td>
                <td>{employeeData.role}</td>
                <td>{employeeData.department}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <Footer/>
    </div>
    
    
  );
}
 
export default EmpView;
 