import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/cssfiles/Start.css'; 
import start from '../images/start.gif'

const HomePage = () => {
    return (
      <div className="cons">
        <div className="content">
          <div className="car-cons">
            <img src={start} alt="Car" className="car-image" />
          </div>
          <div className="button-cons">
            <Link to="/adminlogin" className="button admin-button">
              Login as Worker
            </Link>
            <Link to="/userlogin" className="button user-button">
              Login as User
            </Link>
          </div>
        </div>
      </div>
    )
  };
  
  export default HomePage;
  
