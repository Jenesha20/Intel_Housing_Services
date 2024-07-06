import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/cssfiles/Workerupdateprofile.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Workerupdateprofile = () => {
  const [worker, setWorker] = useState({
    name: '',
    mobno: '',
    password: '',
    street: '',
    area: '',
    city: '',
    state: '',
    photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  });
  const [image, setImage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Fetch worker details from local storage
  useEffect(() => {
    const name = localStorage.getItem('nameu') || '';
    const mobno = localStorage.getItem('mobnou') || '';
    const password = localStorage.getItem('passwordu') || '';
    const street = localStorage.getItem('streetu') || '';
    const area = localStorage.getItem('areau') || '';
    const city = localStorage.getItem('cityu') || '';
    const state = localStorage.getItem('stateu') || '';
    const photo = localStorage.getItem('imageu') || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

    setWorker({ name, mobno, password, street, area, city, state, photo });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorker({ ...worker, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        console.log("Submitting worker update:", JSON.stringify(worker, null, 2));
        
        // Update worker details
        const response = await axios.put(`http://localhost:3000/api/worker/${worker.mobno}`, worker);
        console.log("Worker update response:", response.data);

        toast.success('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Error updating profile');
    }
  };

  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
      setWorker({ ...worker, photo: reader.result });
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };

  const uploadImage = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/worker", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ base64: image })
      });
      const data = await response.json();
      console.log(data);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    }
  };

  return (
    <div className="container">
      <h2>Update Worker Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-wrapper">
          <div className="auth-image" style={{ width: 'auto' }}>
            <input accept="image/*" type="file" onChange={convertToBase64} />
            {image === '' || image === null ? '' : <img width={100} height={100} src={image} alt="Profile" />}
            <button type="button" onClick={uploadImage}>Upload</button>
          </div>
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={worker.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="number" name="mobno" value={worker.mobno} onChange={handleInputChange} required readOnly />
        </div>
        <div>
          <label>Password:</label>
          <div className="password-wrapper">
            <input type={showPassword ? 'text' : 'password'} name="password" value={worker.password} onChange={handleInputChange} required />
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="show-password-checkbox"
            />
          </div>
        </div>
        <div>
          <label>Street:</label>
          <input type="text" name="street" value={worker.street} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Area:</label>
          <input type="text" name="area" value={worker.area} onChange={handleInputChange} required />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" value={worker.city} onChange={handleInputChange} required />
        </div>
        <div>
          <label>State:</label>
          <input type="text" name="state" value={worker.state} onChange={handleInputChange} required />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Workerupdateprofile;
