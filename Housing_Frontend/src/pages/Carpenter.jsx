import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import '../pages/cssfiles/Carpenter.css'; 

function Carpenter() {
  const [carpenters, setCarpenters] = useState([]);
  const [selectedCarpenter, setSelectedCarpenter] = useState(null);
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

    // Fetch carpenters data from API
    fetchCarpenters(storedLocation);
  }, []);

  const fetchCarpenters = async (userCity) => {
    try {
      const response = await axios.get('http://localhost:3000/api/worker'); // Replace with your API endpoint
      const apiCarpenters = response.data;
      
      console.log('API Carpenters:', apiCarpenters); // Log fetched data
      console.log('User Location:', userCity); // Log user location
      
      // Filter carpenters based on user location (case-insensitive)
      const filteredCarpenters = apiCarpenters.filter(
        (carpenter) => carpenter.city.toLowerCase() === userCity.toLowerCase() && carpenter.workType.toLowerCase() === "carpenter"
      );
      
      console.log('Filtered Carpenters:', filteredCarpenters); // Log filtered data
      setCarpenters(filteredCarpenters);
      
    } catch (error) {
      console.error('Error fetching carpenters:', error);
      // Handle error (e.g., show a message)
    }
  };

  const openModal = (carpenter) => {
    setSelectedCarpenter(carpenter);
    setNewRating('');
  };

  const closeModal = () => {
    setSelectedCarpenter(null);
  };

  const updateRating = () => {
    if (selectedCarpenter && newRating) {
      setCarpenters((prevCarpenters) =>
        prevCarpenters.map((carpenter) =>
          carpenter.id === selectedCarpenter.id
            ? { ...carpenter, rating: parseFloat(newRating) }
            : carpenter
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
          <span className="app-name">Carpenter Services</span>
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
        <div className="carpenter-container">
          {carpenters.map((carpenter) => (
            <div className="carpenter-card" key={carpenter.id} onClick={() => openModal(carpenter)}>
              <img src={carpenter.image} alt={carpenter.name} className="card-image" />
              <div className="card-details">
                <h2 className="card-name">{carpenter.name}</h2>
                <p className="card-location">Location: {carpenter.city}</p>
                <p className="card-rating">Rating: {carpenter.rating}</p>
                <p className="card-phone">Phone: {carpenter.mobno}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedCarpenter && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedCarpenter.image} alt={selectedCarpenter.name} className="modal-image" />
            <h2 className="modal-name">{selectedCarpenter.name}</h2>
            <p className="modal-location">Location: {selectedCarpenter.city}</p>
            <p className="modal-rating">Rating: {selectedCarpenter.rating}</p>
            <p className="modal-phone">Phone: {selectedCarpenter.mobno}</p>
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

export default Carpenter;
