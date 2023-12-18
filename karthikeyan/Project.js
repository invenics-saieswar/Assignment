import React, { useState } from "react";
import '../../Pages/CSS/Project.css'; 
function Project() {
    const [displayedComponent, setDisplayedComponent] = useState(null);
    const [projectData, setProjectData] = useState({
        projectName: "",
        projectId: "",
        department: "",
        startDate: "",
        endDate: "",
        skillsRequired: [],
        newSkill: ""
    });
    const [projectsList, setProjectsList] = useState([]);
 
    const showCreateProject = () => {
        setDisplayedComponent("CreateProject");
    };
 
    const showDeleteProject = () => {
        setDisplayedComponent("DeleteProject");
    };
 
    const showListOfProjects = () => {
        setDisplayedComponent("ListOfProjects");
    };
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value
        });
    };
 
    const handleSkillInputChange = (e) => {
        setProjectData({
            ...projectData,
            newSkill: e.target.value
        });
    };
 
    const handleAddSkill = () => {
        if (projectData.newSkill.trim() !== "") {
            setProjectData({
                ...projectData,
                skillsRequired: [...projectData.skillsRequired, projectData.newSkill],
                newSkill: ""
            });
        }
    };
 
    const handleDeleteSkill = (skillToDelete) => () => {
        setProjectData({
            ...projectData,
            skillsRequired: projectData.skillsRequired.filter(
                (skill) => skill !== skillToDelete
            )
        });
    };
 
    const handleCreateProject = () => {
        const newProject = {
            projectName: projectData.projectName,
            projectId: projectData.projectId,
            department: projectData.department,
            startDate: projectData.startDate,
            endDate: projectData.endDate,
            skillsRequired: projectData.skillsRequired
        };
 
        setProjectsList([...projectsList, newProject]);
 
        setProjectData({
            projectName: "",
            projectId: "",
            department: "",
            startDate: "",
            endDate: "",
            skillsRequired: [],
            newSkill: ""
        });
 
        alert("Project created successfully!");
    };
 
    const handleDeleteProjectById = (projectIdToDelete) => {
        const updatedProjectsList = projectsList.filter(
            (project) => project.projectId !== projectIdToDelete
        );
 
        setProjectsList(updatedProjectsList);
 
        alert(`Project with ID ${projectIdToDelete} has been deleted.`);
    };
 
    const renderComponent = () => {
        switch (displayedComponent) {
            case "CreateProject":
                return (
                    <div className="create-project-container">
                        {/* Your code for Create Project component */}
                        <h1 className="create-project-title">Create Project</h1>
                        <label className="project-name-label">
                            Project Name:
                            <input
                                type="text"
                                name="projectName"
                                value={projectData.projectName}
                                onChange={handleChange}
                                className="project-name-input unique-projectName-input"
                            />
                        </label>
                        <br />
                        <label className="project-id-label">
                            Project ID:
                            <input
                                type="text"
                                name="projectId"
                                value={projectData.projectId}
                                onChange={handleChange}
                                className="project-id-input unique-projectId-input"
                            />
                        </label>
                        <br />
                        <label className="department-label">
                            Department:
                            <input
                                type="text"
                                name="department"
                                value={projectData.department}
                                onChange={handleChange}
                                className="department-input unique-department-input"
                            />
                        </label>
                        <br />
                        <label className="start-date-label">
                            Start Date:
                            <input
                                type="date"
                                name="startDate"
                                value={projectData.startDate}
                                onChange={handleChange}
                                className="start-date-input unique-startDate-input"
                            />
                        </label>
                        <br />
                        <label className="end-date-label">
                            End Date:
                            <input
                                type="date"
                                name="endDate"
                                value={projectData.endDate}
                                onChange={handleChange}
                                className="end-date-input unique-endDate-input"
                            />
                        </label>
                        <br />
                        <label className="skills-required-label">
                            Skills Required:
                            <input
                                type="text"
                                value={projectData.newSkill}
                                onChange={handleSkillInputChange}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        handleAddSkill();
                                    }
                                }}
                                placeholder="Type and press Enter"
                                className="skills-required-input"
                            />
                        </label>
                        <div className="chips-container">
                            {projectData.skillsRequired.map((skill, index) => (
                                <div key={index} className="chip">
                                    <span>{skill}</span>
                                    <button onClick={handleDeleteSkill(skill)} className="delete-chip-button">x</button>
                                </div>
 
                            ))}
                        </div>
                        <br />
                        <button onClick={handleCreateProject} className="create-button unique-create-button">Create Project</button>
                    </div>
                );
            case "DeleteProject":
                return (
                    <div className="delete-project-container">
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
                        </label>
                        <br />
                        <button onClick={() => handleDeleteProjectById(projectData.projectId)} className="delete-button unique-delete-button">Delete Project</button>
                    </div>
 
                );
            // default:
            case "ListOfProjects":
                return (
                    <div className="list-of-projects-container">
                        {/* Your code for List of Projects component */}
                        <h1 className="list-of-projects-title">List of Projects</h1>
                        <table className="projects-table unique-projects-table">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Project ID</th>
                                    <th>Department</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Skills Required</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectsList.map((project, index) => (
                                    <tr key={index}>
                                        <td>{project.projectName}</td>
                                        <td>{project.projectId}</td>
                                        <td>{project.department}</td>
                                        <td>{project.startDate}</td>
                                        <td>{project.endDate}</td>
                                        <td>{project.skillsRequired.join(", ")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return (
                    <div className="list-of-projects-container">
                        {/* Your code for List of Projects component */}
                        <h1 className="list-of-projects-title">List of Projects</h1>
                        <table className="projects-table unique-projects-table">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Project ID</th>
                                    <th>Department</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Skills Required</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectsList.map((project, index) => (
                                    <tr key={index}>
                                        <td>{project.projectName}</td>
                                        <td>{project.projectId}</td>
                                        <td>{project.department}</td>
                                        <td>{project.startDate}</td>
                                        <td>{project.endDate}</td>
                                        <td>{project.skillsRequired.join(", ")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
        }
    };
 
    //
 
    return (
        <div className="project-wrapper">
            <div className="button-container">
                {/* Your buttons */}
                <button onClick={showCreateProject} className="create-project-button unique-create-project-button">Create Project</button>
                <button onClick={showDeleteProject} className="delete-project-button unique-delete-project-button">Delete Project</button>
                <button onClick={showListOfProjects} className="list-of-projects-button unique-list-of-projects-button">List of Projects</button>
            </div>
            <div className="component-container">{renderComponent()}</div>
 
        </div>
    );
}
 
export default Project;
