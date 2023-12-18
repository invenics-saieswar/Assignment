import React, { useState } from "react";
import '../../Pages/CSS/Project.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';


function CreateProject() {
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
    const [errors, setErrors] = useState({
        	projectNameError: "",
        	projectIdError: "",
        	departmentError: "",
        	startDateError: "",
        	endDateError: ""
        	});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value
        });
    validateInput(name, value);
    };

const validateInput = (name, value) => {
    switch (name) {
        case "projectName":
            const nameRegex = /^[a-zA-Z\s]+$/;
            if (!value.match(nameRegex)) {
                setErrors({ ...errors, projectNameError: "Only alphabets are allowed." });
            } else {
                setErrors({ ...errors, projectNameError: "" });
            }
            break;
        case "projectId":
            const idRegex = /^[0-9]+$/;
            if (!value.match(idRegex)) {
                setErrors({ ...errors, projectIdError: "Only numbers are allowed." });
            } else {
                setErrors({ ...errors, projectIdError: "" });
            }
            break;
        case "department":
            const departmentRegex = /^[a-zA-Z\s]+$/;
            if (!value.match(departmentRegex)) {
                setErrors({ ...errors, departmentError: "Only alphabets are allowed." });
            } else {
                setErrors({ ...errors, departmentError: "" });
            }
            break;
        default:
            break;
    }
};

  // ... (existing code remains the same)

const sendEmail = async (newProject) => {
    const emailDetails = {
        subject: 'New Project Created',
        body: `Project has been created with the following details:
        Project Name: ${newProject.projectName}
        Project ID: ${newProject.projectId}
        Department: ${newProject.department}
        Start Date: ${newProject.startDate}
        End Date: ${newProject.endDate}
        Skills Required: ${newProject.skillsRequired.join(", ")}`
    };

    try {
        const response = await fetch('http://localhost:3001/sendCreateProject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailDetails),
        });

        if (response.ok) {
            alert('Project created successfully! Email sent.');
        } else {
            alert('Project created successfully! Failed to send email.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Project created successfully! Failed to send email.');
    }
};

// Rest of the code remains the same

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

    const handleCreateProject = async () => {
        const isValid = validateForm();

        if (isValid) {
            // Rest of your logic for creating a project...
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

            sendEmail(newProject);

            alert("Project created successfully!");
        } else {
            alert('Please check all the fields.');
        }
    };

    const validateForm = () => {
        const {
            projectName,
            projectId,
            department,
            startDate,
            endDate
        } = projectData;
    
        const isProjectNameValid = projectName.trim() !== "" && !errors.projectNameError;
        const isProjectIdValid = projectId.trim() !== "" && !errors.projectIdError;
        const isDepartmentValid = department.trim() !== "" && !errors.departmentError;
        const isStartDateValid = startDate.trim() !== "" && !errors.startDateError;
        const isEndDateValid = endDate.trim() !== "" && !errors.endDateError;
    
        return (
            isProjectNameValid &&
            isProjectIdValid &&
            isDepartmentValid &&
            isStartDateValid &&
            isEndDateValid
        );

    };


// ... (existing code remains the same)

return (
    <div className="create-project-container">
        <Header />
        <Sidebar />
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
            {errors.projectNameError && <p className="error-message">{errors.projectNameError}</p>}
        </label>
        {/* Other input fields */}
        <label className="project-id-label">
            Project ID:
            <input
                type="text"
                name="projectId"
                value={projectData.projectId}
                onChange={handleChange}
                className="project-id-input unique-projectId-input"
            />
            {errors.projectIdError && <p className="error-message">{errors.projectIdError}</p>}
        </label>
        {/* Department, Start Date, End Date inputs */}
        <label className="department-label">
            Department:
            <input
                type="text"
                name="department"
                value={projectData.department}
                onChange={handleChange}
                className="department-input unique-department-input"
            />
            {errors.departmentError && <p className="error-message">{errors.departmentError}</p>}
        </label>
        {/* ... */}
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
        <Footer />
    </div>
);

}

export default CreateProject;
