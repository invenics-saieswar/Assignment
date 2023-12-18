//Router.js
import { Routes, Route } from 'react-router-dom';
import App from '../../App';
import EmailForm from './Email';
import DeptAdd from './DeptAdd';
import EmpView from './EmpView';
import EmpUpdate from './EmpUpdate';
import EmpDelete from './EmpDelete';
import EmpAdd from './EmpAdd';
import DeptView from './DeptView';
import DeptUpdate from './DeptUpdate';
import DeptDelete from './DeptDelete';
import CreateProject from './CreateProject';
import DeleteProject from './DeleteProject';
import ListOfProjects from './ViewProject';
import EmpManagement from './EmpManagement';
import AdminDashboard from './AdminDashBoard';
import ProjectApproval from './ProjectApproval'
function Router() {  
    return (
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project-work" element={<EmailForm />} />
        <Route path="/assign-project" element={<AdminDashboard />} />
        <Route path="/project-approval" element={<ProjectApproval />} />

        <Route path="/add-department" element={<DeptAdd />} />
        <Route path="/update-department" element={<DeptUpdate />} />
        <Route path="/delete-department" element={<DeptDelete />} />
        <Route path="/view-department" element={<DeptView />} />

        <Route path="/add-employee" element={<EmpAdd />} />
        <Route path="/update-employee" element={<EmpUpdate />} />
        <Route path="/delete-employee" element={<EmpDelete />} />
        {/* <Route path="/view-employee" element={<EmpView />} /> */}
        <Route path="/view-employee" element={<EmpManagement />} />

        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/delete-project" element={<DeleteProject />} />
        <Route path="/view-project" element={<ListOfProjects />} />
        
      </Routes>
    );
  }
  
  export default Router;
  