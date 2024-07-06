import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import '../pages/cssfiles/Essentials.css'; 

function Essentials() {
  const [essentials, setEssentials] = useState([]);
  const [selectedEssential, setSelectedEssential] = useState(null);
  const [newRating, setNewRating] = useState('');
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

    // Fetch essentials data from API
    fetchEssentials(storedLocation);
  }, []);

  const fetchEssentials = async (userCity) => {
    try {
      const response = await axios.get('http://localhost:3000/api/worker'); // Replace with your API endpoint
      const apiEssentials = response.data;
      
      console.log('API Essentials:', apiEssentials); // Log fetched data
      console.log('User Location:', userCity); // Log user location
      
      // Filter essentials based on user location (case-insensitive)
      const filteredEssentials = apiEssentials.filter(
        (essential) => essential.city.toLowerCase() === userCity.toLowerCase() && essential.profession.toLowerCase() === 'essential'
      );
      
      console.log('Filtered Essentials:', filteredEssentials); // Log filtered data
      setEssentials(filteredEssentials);
      
    } catch (error) {
      console.error('Error fetching essentials:', error);
      // Handle error (e.g., show a message)
    }
  };

  const openModal = (essential) => {
    setSelectedEssential(essential);
    setNewRating('');
  };

  const closeModal = () => {
    setSelectedEssential(null);
  };

  const updateRating = () => {
    if (selectedEssential && newRating) {
      setEssentials((prevEssentials) =>
        prevEssentials.map((essential) =>
          essential.id === selectedEssential.id
            ? { ...essential, rating: parseFloat(newRating) }
            : essential
        )
      );
      closeModal();
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
          <span className="app-name">Essential Services</span>
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
        <div className="essential-container">
          {essentials.map((essential) => (
            <div className="essential-card" key={essential.id} onClick={() => openModal(essential)}>
              <img src={essential.image} alt={essential.name} className="card-image" />
              <div className="card-details">
                <h2 className="card-name">{essential.name}</h2>
                <p className="card-location">Location: {essential.city}</p>
                <p className="card-rating">Rating: {essential.rating}</p>
                <p className="card-phone">Phone: {essential.mobno}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedEssential && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedEssential.image} alt={selectedEssential.name} className="modal-image" />
            <h2 className="modal-name">{selectedEssential.name}</h2>
            <p className="modal-location">Location: {selectedEssential.city}</p>
            <p className="modal-rating">Rating: {selectedEssential.rating}</p>
            <p className="modal-phone">Phone: {selectedEssential.mobno}</p>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              className="rating-input"
              placeholder="New Rating"
            />
            <button onClick={updateRating} className="update-button">
              Update Rating
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Essentials;
