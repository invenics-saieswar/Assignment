
import React, { useState } from 'react';
import '../../Pages/CSS/deptView.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
 
function DeptManagement() {
  const [departmentData, setDepartmentData] = useState({
    1: { id: 1, name: 'App Dev' },
    2: { id: 2, name: 'Automation' },
    3: { id: 3, name: 'SAP' },
    4: { id: 4, name: 'Product' },
  });
 
  const [selectedRows, setSelectedRows] = useState([]);
  const [editDepartment, setEditDepartment] = useState(null);

  const handleDelete = async () => {
    const deletedDepartments = selectedRows.map((id) => departmentData[id]);

    try {
      const response = await fetch('http://localhost:3001/sendDeleteDepartmentEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deletedDepartments }),
      });

      if (response.ok) {
        console.log('Delete email sent successfully!');
      } else {
        console.error('Failed to send delete email.');
      }
    } catch (error) {
      console.error('Error sending delete email:', error);
    }

   setDepartmentData((prevData) => {
      const newData = { ...prevData };
      selectedRows.forEach((id) => {
        delete newData[id];
      });
      return newData;
    });
    setSelectedRows([]);
  };
 
  const handleEdit = () => {
    setEditDepartment(selectedRows[0]);
  };
 
  const handleSaveEdit = async () => {
    try {
      const editedDepartment = departmentData[editDepartment]; // Accessing the department object using editDepartment ID
  
      if (editedDepartment) {
        const { name } = editedDepartment; // Destructure the 'name' property
  
        const response = await fetch('http://localhost:3001/sendEditDepartmentEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }), // Send only the 'name' property
        });
  
        if (response.ok) {
          console.log('Edit email sent successfully!');
        } else {
          console.error('Failed to send edit email.');
        }
      } else {
        console.error('Edited department not found.');
      }
    } catch (error) {
      console.error('Error sending edit email:', error);
    }
  
    setEditDepartment(null);
  };
  
  
 
  const handleCancelEdit = () => {
    setEditDepartment(null);
  };
 
  const handleCheckboxChange = (departmentId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(departmentId)) {
        return prevSelectedRows.filter((id) => id !== departmentId);
      } else {
        return [...prevSelectedRows, departmentId];
      }
    });
  };
 
  const handleInputChange = (field, value) => {
    setDepartmentData((prevData) => {
      const newData = { ...prevData };
      newData[editDepartment][field] = value;
      return newData;
    });
  };
 
  return (
    <div className="dept-management-container">
      <Header/>
      <Sidebar/>
      <h2 className="dept-management-title">Department Management</h2>
      <div className="dept-management-buttons">
        {editDepartment ? (
          <>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} disabled={selectedRows.length !== 1}>
              Edit
            </button>
            <button onClick={handleDelete} disabled={selectedRows.length === 0}>
              Delete
            </button>
          </>
        )}
      </div>
 
      <table className="dept-management-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(departmentData).map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>
                {editDepartment === department.id ? (
                  <input
                    type="text"
                    value={departmentData[department.id].name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : (
                  department.name
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(department.id)}
                  onChange={() => handleCheckboxChange(department.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer/>
    </div>
  );
}
 
export default DeptManagement;
 