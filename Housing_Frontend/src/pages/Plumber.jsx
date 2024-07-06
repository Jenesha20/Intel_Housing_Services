import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import '../pages/cssfiles/Plumber.css'; 

function Plumber() {
  const [plumbers, setPlumbers] = useState([]);
  const [selectedPlumber, setSelectedPlumber] = useState(null);
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

    // Fetch plumbers data from API
    fetchPlumbers(storedLocation);
  }, []);

  const fetchPlumbers = async (userCity) => {
    try {
      const response = await axios.get('http://localhost:3000/api/worker'); // Replace with your API endpoint
      const apiPlumbers = response.data;
      
      console.log('API Plumbers:', apiPlumbers); // Log fetched data
      console.log('User Location:', userCity); // Log user location
      
      // Filter plumbers based on user location (case-insensitive)
      const filteredPlumbers = apiPlumbers.filter(
        (plumber) =>
          plumber.city.toLowerCase() === userCity.toLowerCase() &&
          plumber.workType.toLowerCase() === "plumber"
      );
      
      console.log('Filtered Plumbers:', filteredPlumbers); // Log filtered data
      setPlumbers(filteredPlumbers);
      
    } catch (error) {
      console.error('Error fetching plumbers:', error);
      // Handle error (e.g., show a message)
    }
  };

  const openModal = (plumber) => {
    setSelectedPlumber(plumber);
    setNewRating('');
  };

  const closeModal = () => {
    setSelectedPlumber(null);
  };

  const updateRating = () => {
    if (selectedPlumber && newRating) {
      setPlumbers((prevPlumbers) =>
        prevPlumbers.map((plumber) =>
          plumber.id === selectedPlumber.id
            ? { ...plumber, rating: parseFloat(newRating) }
            : plumber
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
          <span className="app-name">Plumber Services</span>
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
        <div className="plumber-container">
          {plumbers.map((plumber) => (
            <div className="plumber-card" key={plumber.id} onClick={() => openModal(plumber)}>
              <img src={plumber.image} alt={plumber.name} className="card-image" />
              <div className="card-details">
                <h2 className="card-name">{plumber.name}</h2>
                <p className="card-location">Location: {plumber.city}</p>
                <p className="card-rating">Rating: {plumber.rating}</p>
                <p className="card-phone">Phone: {plumber.mobno}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedPlumber && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedPlumber.image} alt={selectedPlumber.name} className="modal-image" />
            <h2 className="modal-name">{selectedPlumber.name}</h2>
            <p className="modal-location">Location: {selectedPlumber.city}</p>
            <p className="modal-rating">Rating: {selectedPlumber.rating}</p>
            <p className="modal-phone">Phone: {selectedPlumber.mobno}</p>
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

export default Plumber;
