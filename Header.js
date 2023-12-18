import React from 'react';
import { Link} from 'react-router-dom';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';

const Header = () => {
    const navigate = useNavigate();
    
  return (
    <div className='Main-div'>
    <nav className="navbar">
    <div className="nav-text"><strong>Project Management System</strong></div>
      <Link to="/" className="nav-link" onClick={()=>navigate("/LandingPage")}>Home</Link>
      <Link to="/about" className="nav-link" onClick={()=>navigate("/About")}>About</Link>
      <Link to="/contact" className="nav-link" onClick={()=>navigate("/Contact")}>Contact</Link>
    <div className="nav-img">
        <img src="profile.jpg" alt="profile"></img>
    </div>
    </nav>
    </div>
  );
};

export default Header;
