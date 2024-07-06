import React from 'react';
import Success from '../images/success.gif'
import { Link } from 'react-router-dom';

import '../pages/cssfiles/RegistrationSuccessPage.css'; // Import the CSS file

const UserRegistrationSucess = () => {
  return (
    <div className="containers">
      <div className="registration-success">
      <div className="image">
            <img src={Success} alt="success" />
        </div>
        <br />
        <h2>Registration Successful!</h2>
        <p>Your account has been successfully registered.</p>
        <p>You can now log in using your credentials.</p>
        <Link to="/userlogin">Sign In</Link>
      </div>
    </div>
  );
};

export default UserRegistrationSucess;
