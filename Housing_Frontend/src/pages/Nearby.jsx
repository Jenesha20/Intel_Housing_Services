import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import '../pages/cssfiles/Nearby.css'; 

function Nearby() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [newRating, setNewRating] = useState('');
  const [userName, setUserName] = useState('');
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('nameu');
    const storedLocation = localStorage.getItem('areau');

    if (storedName) {
      setUserName(storedName);
    }

    if (storedLocation) {
      setUserLocation(storedLocation);
    }

    // Fetch services data from API
    fetchServices(storedLocation);
  }, []);

  const fetchServices = async (userArea) => {
    try {
      const response = await axios.get('http://localhost:3000/api/worker'); // Replace with your API endpoint
      const apiServices = response.data;
      
      console.log('API Services:', apiServices); // Log fetched data
      console.log('User Location:', userArea); // Log user location
      
      // Filter services based on user location (case-insensitive)
      const filteredServices = apiServices.filter(
        (service) => service.area.toLowerCase() === userArea.toLowerCase()
      );
      
      console.log('Filtered Services:', filteredServices); // Log filtered data
      setServices(filteredServices);
      
    } catch (error) {
      console.error('Error fetching services:', error);
      // Handle error (e.g., show a message)
    }
  };

  const openModal = (service) => {
    setSelectedService(service);
    setNewRating('');
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const updateRating = () => {
    if (selectedService && newRating) {
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === selectedService.id
            ? { ...service, rating: parseFloat(newRating) }
            : service
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
          <span className="app-name">Service Finder</span>
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
        <div className="service-container">
          {services.map((service) => (
            <div className="service-card" key={service.id} onClick={() => openModal(service)}>
              <img src={service.image} alt={service.name} className="card-image" />
              <div className="card-details">
                <h2 className="card-name">{service.name}</h2>
                <p className="card-location">Location: {service.area}</p>
                <p className="card-profession">Profession: {service.workType}</p>
                <p className="card-rating">Rating: {service.rating}</p>
                <p className="card-phone">Phone: {service.mobno}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedService && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedService.image} alt={selectedService.name} className="modal-image" />
            <h2 className="modal-name">{selectedService.name}</h2>
            <p className="modal-location">Location: {selectedService.area}</p>
            <p className="modal-profession">Profession: {selectedService.workType}</p>
            <p className="modal-rating">Rating: {selectedService.rating}</p>
            <p className="modal-phone">Phone: {selectedService.mobno}</p>
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

export default Nearby;
