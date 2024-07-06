import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/cssfiles/Adminregistration.css';
import imageregis from '../images/adminregis.jpg';

const AdminRegistration = () => {
  const navigate = useNavigate();
  const [workerId, setWorkerId] = useState('');
  const [name, setName] = useState('');
  const [mobno, setMobno] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [area, setArea] = useState('');
  const [street, setStreet] = useState('');
  const [adharId, setAdharId] = useState('');
  const [workType, setWorkType] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();

    if (isNaN(mobno) || mobno.length !== 10) {
      setError('Mobile number must be a 10-digit number');
      return;
    }

    if (isNaN(adharId) || adharId.length !== 12) {
      setError('Adhar ID must be a 12-digit number');
      return;
    }

    try {
      const workerData = {
        workerId,
        name,
        mobno: parseInt(mobno),
        password,
        city,
        state,
        area,
        street,
        adharId,
        workType
      };

      const response = await axios.post('http://localhost:3000/api/worker', workerData);

      console.log(response.data);

      // Reset all form fields after successful registration
      setWorkerId('');
      setName('');
      setMobno('');
      setPassword('');
      setCity('');
      setState('');
      setArea('');
      setStreet('');
      setAdharId('');
      setWorkType('');
      setError('');

      // Navigate to success page or display success message
      navigate('/adminregissuccess');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="containers">
      <div className="registration-form">
        <div className="image-containers">
          <img src={imageregis} alt="Registration" />
        </div>
        <div className="form-containers">
          <h2>Worker Registration</h2>
          <form onSubmit={handleRegister}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobno">Mobile Number</label>
              <input
                type="text"
                id="mobno"
                value={mobno}
                onChange={(e) => setMobno(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="adharId">Adhar ID</label>
              <input
                type="text"
                id="adharId"
                value={adharId}
                onChange={(e) => setAdharId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="workerId">Worker ID</label>
              <input
                type="text"
                id="workerId"
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="workType">Work Type</label>
              <select
                id="workType"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                required
              >
                <option value="">Select Work Type</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Painter">Painter</option>
                <option value="Maid">Maid</option>
                <option value="Essentials">Essentials</option>
              </select>
            </div>
            <button type="submit" className='but'>Register</button>
          </form>
          <div className="sign-in-container">
            <p>Already a User? Sign In</p>
            <Link to="/adminlogin">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;
