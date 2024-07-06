import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/cssfiles/UserRegistration.css';
import regisimage from '../images/registeruser.avif';

const UserRegistration = () => {
  const navigation = useNavigate();
  const [name, setName] = useState('');
  const [mobno, setMobNo] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        name,
        mobno: parseInt(mobno), // Convert mobno to number as per schema
        password,
        street,
        area,
        city,
        state,
      };

      const response = await axios.post('http://localhost:3000/api/user', userData);
      console.log(response.data);
      
      // Reset form fields after successful registration
      setName('');
      setMobNo('');
      setPassword('');
      setStreet('');
      setArea('');
      setCity('');
      setState('');
      
      // Navigate to success page or display success message
      navigation('/userregissuccess');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="containers">
      <div className="registration-form">
        <div className="image-containers">
          <img src={regisimage} alt="Registration" />
        </div>
        <div className="form-containers">
          <h2>Register</h2>
          <form onSubmit={handleRegistration}>
            <div className="form-groups">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-groups">
              <label htmlFor="mobno">Mobile Number</label>
              <input
                type="tel"
                id="mobno"
                value={mobno}
                onChange={(e) => setMobNo(e.target.value)}
                required
              />
            </div>
            <div className="form-groups">
              <label htmlFor="password">Password</label>
              <div className="password-inputs">
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
            <div className="form-groups">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
            <div className="form-groups">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </div>
            <div className="form-groups">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-groups">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <button type="submit" className='but'>Register</button>
          </form>
          <div className="sign-in-container">
            <p>Already a User? Sign In</p>
            <Link to="/userlogin">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
