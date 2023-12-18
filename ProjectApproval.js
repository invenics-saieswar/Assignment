import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProjectApproval.css';

const ProjectApproval = ({ projects }) => {
  const [selectedProjectForApproval, setSelectedProjectForApproval] = useState('');
  const [approvedMessage, setApprovedMessage] = useState('');

  const handleApprove = (projectName) => {
    // Set the approved message
    setApprovedMessage(` ${projectName} approved!`);
  };

  // Retrieve selected project for approval from location state
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.selectedProjectForApproval) {
      setSelectedProjectForApproval(location.state.selectedProjectForApproval);
    }
  }, [location.state]);

  return (
    <div>
      <h1>Project Approval</h1>
      <p>Selected Project for Approval: {selectedProjectForApproval}</p>

      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className="project-info">
            <p>{`${project.name} - ${project.approvalStatus}`}</p>
            {project.assignedEmps.map((emp) => (
              <div key={emp.empId}>
                <p>{`Emp ${emp.empId} - Dept: ${emp.empDept} - Approval: ${emp.approvalStatus || 'Pending'}`}</p>
              </div>
            ))}
            {project.approvalStatus === 'Pending' && (
              <div key={project.id}>
                {/* Pass the project name to handleApprove */}
                <button onClick={() => handleApprove(project.name)}>Approve</button>
              </div>
            )}
          </div>
        ))
      ) : (
        // Display an "Approve" button even when there are no projects
        <div>
          {/* Pass null or an appropriate default value if there is no selected project */}
          <button onClick={() => handleApprove(selectedProjectForApproval || 'DefaultProject')}>Approve</button>
        </div>
      )}

      {/* Display the approved message */}
      {approvedMessage && <p>{approvedMessage}</p>}
    </div>
  );
};

export default ProjectApproval;
