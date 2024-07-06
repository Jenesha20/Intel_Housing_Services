import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import '../pages/cssfiles/Electrician.css'; 

function Electrician() {
  const [electricians, setElectricians] = useState([]);
  const [userName, setUserName] = useState('');
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('nameu');
    const storedLocation = localStorage.getItem('cityu');

    if (storedName) {
      setUserName(storedName);
    }

    if (storedLocation) {
      setUserLocation(storedLocation);
    }

    // Fetch electricians data from API
    fetchElectricians(storedLocation);
  }, []);

  const fetchElectricians = async (userCity) => {
    try {
      const response = await axios.get('http://localhost:3000/api/worker'); // Replace with your API endpoint
      const apiElectricians = response.data;
      
      console.log('API Electricians:', apiElectricians); // Log fetched data
      console.log('User Location:', userCity); // Log user location
      
      // Filter electricians based on user location (case-insensitive)
      const filteredElectricians = apiElectricians.filter(
        (electrician) =>
          electrician.city.toLowerCase() === userCity.toLowerCase() &&
          electrician.workType.toLowerCase() === "electrician"
      );
      console.log('Filtered Electricians:', filteredElectricians); // Log filtered data
      setElectricians(filteredElectricians);
      
    } catch (error) {
      console.error('Error fetching electricians:', error);
      // Handle error (e.g., show a message)
    }
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <MdLocationOn />
          <p>{userLocation}</p>
        </div>
        <div className="header-center">
          <span className="app-name">Electrician Services</span>
        </div>
        <div className="header-right">
          <Link to="/userhome" className="header-link">
            Back
          </Link>
          <span className="name">{userName}</span>
          <FaUser/>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="electrician-container">
          {electricians.map((electrician) => (
            <div className="electrician-card" key={electrician.id}>
              <img src={electrician.image} alt={electrician.name} className="card-image" />
              <div className="card-details">
                <h2 className="card-name">{electrician.name}</h2>
                <p className="card-location">Location: {electrician.city}</p>
                <p className="card-rating">Rating: {electrician.rating}</p>
                <p className="card-phone">Phone: {electrician.mobno}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Electrician;
