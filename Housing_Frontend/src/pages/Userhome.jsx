import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/cssfiles/HomePage.css'; // Ensure to create this CSS file
import electrician from '../images/electrician.jpg';
import plumber from '../images/plumber.jpg';
import carpenter from '../images/carpenter.jpg';
import painter from '../images/painter.jpg';
import maid from '../images/maid.avif';
import essentials from '../images/essentials.jpg';
import { MdLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";


// Sample data for categories
const categoriesData = [
  { name: "Electrician", image: electrician, link: "/electrician" },
  { name: "Plumber", image: plumber, link: "/plumber" },
  { name: "Carpenter", image: carpenter, link: "/carpenter" },
  { name: "Painter", image: painter, link: "/painter" },
  { name: "Maid", image: maid, link: "/maid" },
  { name: "Essentials", image: essentials, link: "/essentials" }
];

function HomePage() {
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');

  useEffect(() => {
    // Retrieve user information from local storage
    const storedName = localStorage.getItem('nameu');
    const storedCity = localStorage.getItem('cityu');
    
    if (storedName) {
      setUserName(storedName);
    }

    if (storedCity) {
      setUserCity(storedCity);
    }
  }, []);

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <MdLocationOn />
          <p>{userCity}</p>
        </div>
        <div className="header-center">
          <span className="app-name">Housing Services</span>
        </div>
        <div className="header-right">
          <Link to="/Nearby">
            Nearby Services
          </Link>
          <span className="name">{userName}</span>
          <FaUser/>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Categories */}
        <div className="middle-container">
          {categoriesData.map((category, index) => (
            <Link to={category.link} key={index} className="category-link">
              <div className="category-container">
                <img src={category.image} alt={category.name} className="category-image" />
                <span className="category-name">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
