import React, { useState} from "react";
import '../../Pages/CSS/Project.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function DeleteProject() {
    const [projectData, setProjectData] = useState({
        projectId: ""
    });
    const [projectIdError, setProjectIdError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'projectId') {
            // Allow only numeric input for projectId
            const projectIdRegex = /^[0-9]*$/;
            if (!value.match(projectIdRegex)) {
                setProjectIdError("Only numeric characters allowed.");
            } else {
                setProjectIdError("");
            }
        }

        setProjectData({
            ...projectData,
            [name]: value
        });
    };

    const handleDeleteProject = async () => {
        // Assuming you have an endpoint '/deleteProject' in your server.js to handle project deletion
        try {
            const response = await fetch('http://localhost:3001/senddeleteProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectId: projectData.projectId,
                    
                }),
            });

            if (response.ok) {
                console.log('Project deleted successfully!');
            } else {
                console.error('Failed to delete project.');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

   
    return (
        <div className="delete-project-container">
            <Header/>
            <Sidebar/>
            {/* Your code for Delete Project component */}
            <h1 className="delete-project-title">Delete Project</h1>
            <label className="project-id-delete-label">
                Project ID to Delete:
                <input
                    type="text"
                    name="projectId"
                    value={projectData.projectId}
                    onChange={handleChange}
                    className="project-id-delete-input unique-projectId-delete-input"
                />
                {projectIdError && <p className="error-message">{projectIdError}</p>}
            </label>
            <br />
            <button onClick={handleDeleteProject} className="delete-button unique-delete-button">Delete Project</button>
            <Footer/>
        </div>
    );
}

export default DeleteProject;
