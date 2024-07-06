import React, { useState } from 'react';
import axios from 'axios';
import '../pages/cssfiles/Userlogin.css';
import loginImage from '../images/login.avif';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogin = () => {
  const navigation = useNavigate();
  const [name, setName] = useState('');
  const [mobno, setMobNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/api/user/${mobno}`);
      if (response.data && response.data.mobno === parseInt(mobno) && response.data.password === password) {
        console.log(response.data);
        localStorage.setItem('emailu', response.data.email);
        localStorage.setItem('nameu', name); 
        localStorage.setItem('mobnou', response.data.mobno);
        localStorage.setItem('cityu', response.data.city);
        localStorage.setItem('areau', response.data.area);
        localStorage.setItem('stateu', response.data.state);
        localStorage.setItem('streetu', response.data.street);
        navigation('/userhome');
      } else {
        toast.error('Invalid Credentials');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      toast.error('Error logging in. Please try again.');
    }
  };

  return (
    <>
      <div className="con">
        <div className="registration-form">
          <div className="image-con">
            <img src={loginImage} alt="Registration" />
          </div>
          <div className="form-con">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                  type="tel"
                  id="mobno"
                  value={mobno}
                  onChange={(e) => setMobNo(e.target.value)}
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
              <button type="submit" className='btn'>Login</button>
            </form>
            <div className="new-user-con">
              <p>New User? <Link to="/userregis">Register</Link></p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserLogin;
