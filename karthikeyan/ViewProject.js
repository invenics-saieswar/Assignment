// Import necessary dependencies if required
import React, { useState } from "react";
import '../../Pages/CSS/Project.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';


function ListOfProjects() {
    const [projectsList, setProjectsList] = useState([]);

    return (
        <div className="list-of-projects-container">
            <Header/>
            <Sidebar/>
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
            <Footer/>
        </div>
    );
}

export default ListOfProjects;
