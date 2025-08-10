import React from 'react';
import '../components/Styles/Footer.css';
import {Link} from 'react-router-dom';

function Footer() {
  return <>
  <div className="ft">
  <footer>
    <p><Link to ="/about">About Us</Link> | 
    <Link to="/contact">Contact Us</Link> </p>
    <p>© Copyright All rights reserved</p>
  </footer>
  </div>
    
  </>
}

export default Footer