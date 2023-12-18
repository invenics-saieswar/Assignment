import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../Pages/CSS/Sidebar.css';

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(true); // Initially set as admin
  const [showEmployeeOptions, setShowEmployeeOptions] = useState(false);
  const [showDepartmentOptions, setShowDepartmentOptions] = useState(false);
  const [showProjectOptions, setShowProjectOptions] = useState(false);

  const navigate = useNavigate(); // Initializing the navigation function

  const handleAdminClick = () => {
    setIsAdmin(true);
    setShowEmployeeOptions(false); // Hide employee options
    setShowDepartmentOptions(false); // Hide department options
    setShowProjectOptions(false);  
  };

  const handleEmployeeClick = () => {
    setIsAdmin(false);
    setShowEmployeeOptions(false); // Hide employee options
    setShowDepartmentOptions(false); // Hide department options
    setShowProjectOptions(false);
  };

  const handleEditEmployeeClick = () => {
    setShowEmployeeOptions(!showEmployeeOptions); // Toggle visibility of employee options
    setShowDepartmentOptions(false); // Hide department options
    setShowProjectOptions(false);
  };

  const handleEditDepartmentClick = () => {
    setShowDepartmentOptions(!showDepartmentOptions); // Toggle visibility of department options
    setShowEmployeeOptions(false); // Hide employee options
    setShowProjectOptions(false);
  };

  const handleProjectClick = () => {
    setShowProjectOptions(!showProjectOptions);
    setShowDepartmentOptions(false); // Toggle visibility of department options
    setShowEmployeeOptions(false); // Hide employee options
  };
  

  const handleAddDept = () => {
    navigate('/add-department');
  };
  const handleUpdateDept = () => {
    navigate('/update-department');
  };
  const handleDeleteDept = () => {
    navigate('/delete-department');
  };
  const handleViewDept = () => {
    navigate('/view-department');
  };


  const handleAddEmp = () => {
    navigate('/add-employee');
  };
  const handleUpdateEmp = () => {
    navigate('/update-employee');
  };
  const handleDeleteEmp = () => {
    navigate('/delete-employee');
  };
  const handleViewEmp = () => {
    navigate('/view-employee');
  };

  const handleCreateProject = () => {
    navigate('/create-project');
  };

  const handleDeleteProject = () => {
    navigate('/delete-project');
  };

  const handleViewProject = () => {
    navigate('/view-project');
  };

  const handleAssignProject = () => {
    navigate('/assign-project');
  };
  return (
    <aside className="sidebar">
      <div className="toggle-container">
        <button className={`toggle-button ${isAdmin ? 'active' : ''}`} onClick={handleAdminClick}>
          Admin
        </button>
        <button className={`toggle-button ${!isAdmin ? 'active' : ''}`} onClick={handleEmployeeClick}>
          Employee
        </button>
      </div>
      <div className="options">
        {isAdmin ? (
          <div className="admin-options">
            <p className='edit-employee' onClick={handleEditEmployeeClick}>Edit Employee</p>
            {showEmployeeOptions && (
              <div className="emplyee-popup">
                <p className='add-employee' onClick={handleAddEmp}>Add Employee</p>
                <p className='update-employee' onClick={handleUpdateEmp}>Update Employee</p>
                <p className='delete-employee' onClick={handleDeleteEmp}>Delete Employee</p>
                <p className='view-employee' onClick={handleViewEmp}>View Employee</p>
              </div>
            )}
            <hr/>
            <p className='edit-department' onClick={handleEditDepartmentClick}>Edit Department</p>
            {showDepartmentOptions && (
              <div className="department-popup">
                <p className='add-department' onClick={handleAddDept}>Add Department</p>
                <p className='update-department' onClick={handleUpdateDept}>Update Department</p>
                <p className='delete-department' onClick={handleDeleteDept}>Delete Department</p>
                <p className='view-department' onClick={handleViewDept}>View Department</p>
              </div>
            )}
            <hr/>
            <p className='edit-project' onClick={handleProjectClick}>Edit Project</p>
            {showProjectOptions && (
            <div className="project-popup">
            <p className='create-project' onClick={handleCreateProject}>Create Project</p>
            <p className='delete-project' onClick={handleDeleteProject}>Delete Project</p>    
            <p className='view-project' onClick={handleViewProject}>View Project</p>
              </div>
            )}
            <hr/>
            {/* Add more admin-specific options here */}
            <p className='assign-project' onClick={handleAssignProject}>Assign Project</p>
              <hr/>
          </div>
        ) : (
          <div className="employee-options">
            <p>Employee Option 1</p>
            <hr/>
            <p>Employee Option 2</p>
            <hr/>
            <p>Employee Option 3</p>
            <hr/>
            {/* Add more employee-specific options here */}
          </div>
        )}
      </div>
      {/* Rest of your sidebar content */}
    </aside>
  );
};

export default Sidebar;
