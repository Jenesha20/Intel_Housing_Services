import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import '../pages/cssfiles/Maid.css'; 

function Maid() {
  const [maids, setMaids] = useState([]);
  const [selectedMaid, setSelectedMaid] = useState(null);
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

    // Fetch maids data from API
    fetchMaids(storedLocation);
  }, []);

  const fetchMaids = async (userCity) => {
    try {
      const response = await axios.get('http://localhost:3000/api/worker'); // Replace with your API endpoint
      const apiMaids = response.data;
      
      console.log('API Maids:', apiMaids); // Log fetched data
      console.log('User Location:', userCity); // Log user location
      
      // Filter maids based on user location (case-insensitive)
      const filteredMaids = apiMaids.filter(
        (maid) => maid.city.toLowerCase() === userCity.toLowerCase() && maid.workType.toLowerCase() === "maid"
      );
      
      console.log('Filtered Maids:', filteredMaids); // Log filtered data
      setMaids(filteredMaids);
      
    } catch (error) {
      console.error('Error fetching maids:', error);
      // Handle error (e.g., show a message)
    }
  };

  const openModal = (maid) => {
    setSelectedMaid(maid);
    setNewRating('');
  };

  const closeModal = () => {
    setSelectedMaid(null);
  };

  const updateRating = () => {
    if (selectedMaid && newRating) {
      setMaids((prevMaids) =>
        prevMaids.map((maid) =>
          maid.id === selectedMaid.id
            ? { ...maid, rating: parseFloat(newRating) }
            : maid
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
          <span className="app-name">Maid Services</span>
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
        <div className="maid-container">
          {maids.map((maid) => (
            <div className="maid-card" key={maid.id} onClick={() => openModal(maid)}>
              <img src={maid.image} alt={maid.name} className="card-image" />
              <div className="card-details">
                <h2 className="card-name">{maid.name}</h2>
                <p className="card-location">Location: {maid.city}</p>
                <p className="card-rating">Rating: {maid.rating}</p>
                <p className="card-phone">Phone: {maid.mobno}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedMaid && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedMaid.image} alt={selectedMaid.name} className="modal-image" />
            <h2 className="modal-name">{selectedMaid.name}</h2>
            <p className="modal-location">Location: {selectedMaid.city}</p>
            <p className="modal-rating">Rating: {selectedMaid.rating}</p>
            <p className="modal-phone">Phone: {selectedMaid.mobno}</p>
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

export default Maid;
