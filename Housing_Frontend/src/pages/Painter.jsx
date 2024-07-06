import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import '../pages/cssfiles/Painter.css'; 

function Painter() {
  const [painters, setPainters] = useState([]);
  const [selectedPainter, setSelectedPainter] = useState(null);
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

    // Fetch painters data from API
    fetchPainters(storedLocation);
  }, []);

  const fetchPainters = async (userCity) => {
    try {
      const response = await axios.get('http://localhost:3000/api/worker'); // Replace with your API endpoint
      const apiPainters = response.data;
      
      console.log('API Painters:', apiPainters); // Log fetched data
      console.log('User Location:', userCity); // Log user location
      
      // Filter painters based on user location (case-insensitive)
      const filteredPainters = apiPainters.filter(
        (painter) => painter.city.toLowerCase() === userCity.toLowerCase() && painter.workType.toLowerCase() === "painter"
      );
      
      console.log('Filtered Painters:', filteredPainters); // Log filtered data
      setPainters(filteredPainters);
      
    } catch (error) {
      console.error('Error fetching painters:', error);
      // Handle error (e.g., show a message)
    }
  };

  const openModal = (painter) => {
    setSelectedPainter(painter);
    setNewRating('');
  };

  const closeModal = () => {
    setSelectedPainter(null);
  };

  const updateRating = () => {
    if (selectedPainter && newRating) {
      setPainters((prevPainters) =>
        prevPainters.map((painter) =>
          painter.id === selectedPainter.id
            ? { ...painter, rating: parseFloat(newRating) }
            : painter
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
          <span className="app-name">Painter Services</span>
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
        <div className="painter-container">
          {painters.map((painter) => (
            <div className="painter-card" key={painter.id} onClick={() => openModal(painter)}>
              <img src={painter.image} alt={painter.name} className="card-image" />
              <div className="card-details">
                <h2 className="card-name">{painter.name}</h2>
                <p className="card-location">Location: {painter.city}</p>
                <p className="card-rating">Rating: {painter.rating}</p>
                <p className="card-phone">Phone: {painter.mobno}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedPainter && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedPainter.image} alt={selectedPainter.name} className="modal-image" />
            <h2 className="modal-name">{selectedPainter.name}</h2>
            <p className="modal-location">Location: {selectedPainter.city}</p>
            <p className="modal-rating">Rating: {selectedPainter.rating}</p>
            <p className="modal-phone">Phone: {selectedPainter.mobno}</p>
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

export default Painter;
