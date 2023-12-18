//Footer.js
import React from 'react';
import { SiGnusocial } from "react-icons/si";
import { SlSocialReddit } from "react-icons/sl";
import { SlSocialFoursqare } from "react-icons/sl";
import '../../Pages/CSS/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <SiGnusocial className="footer-icon" />
        <SlSocialReddit  className="footer-icon"/>
        <SlSocialFoursqare className="footer-icon"/>
        {/* Add more icons as needed */}
      </div>
    </footer>
  );
};

export default Footer;
