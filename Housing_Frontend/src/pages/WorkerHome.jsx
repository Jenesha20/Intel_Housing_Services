import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/cssfiles/WorkerHome.css'; // Import the CSS file

const WorkerHome = () => {
  const workerLocation = localStorage.getItem('worker_location') || 'Unknown Location'; // Retrieve worker location from local storage

  return (
    <div className="worker-home">
      <main>
        <section className="welcome-section">
          <div className="welcome-content">
            <h2 style={{ textAlign: 'center' }}>Welcome to Our Worker Platform!</h2>
            <p>Your gateway to excellence! Unlock your potential with our powerful tools and resources designed just for you.</p>
          </div>
            <Link to="/workerupdateprofile">
              <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="Profile" className="profile-photo" />
              <p className='text-black underline'>Update Your Profile</p>
            </Link>
          
        </section>
        <section className="content-section">
          <div className="content-card">
            <h3>Work Resources</h3>
            <p>"Empower Your Work!"</p>
            <p>Dive into our extensive work oppourtunity</p>
          </div>
          <div className="content-card">
            <h3>Community Forum</h3>
            <p>"Connect & Grow!"</p>
            <p>Join the conversation, share your knowledge, and learn from fellow professionals.</p>
          </div>
          <div className="content-card">
            <h3>Support Center</h3>
            <p>"We’ve Got Your Back!"</p>
            <p>Need help? Our support team is here to assist you with any questions or issues.</p>
          </div>
        </section>
        <section className="info-section">
          <div className="info-heading">
            <h2>Why Choose Our Platform?</h2>
          </div>
          <div className="content-card">
            <p>"Unlock Your Potential!"</p>
            <p>Access powerful tools and resources tailored to enhance your skills and career development.</p>
          </div>
          <div className="content-card">
            <p>"Community Engagement!"</p>
            <p>Join a vibrant community of professionals to share knowledge, network, and collaborate.</p>
          </div>
          <div className="content-card">
            <p>"Reliable Support!"</p>
            <p>Our dedicated support team ensures you have assistance whenever you need it, ensuring a smooth experience.</p>
          </div>
          <div className="content-card">
            <p>"Secure & User-Friendly!"</p>
            <p>Navigate our platform with ease knowing your data is secure and our interface is designed for efficiency.</p>
          </div>
          <div className="content-card contact-card">
            <h3>Contact Us</h3>
            <p>"Have questions? Need assistance? Reach out to us!"</p>
            <p>Email: <a href="mailto:info@workerplatform.com">jeneshamalars@gmail.com</a></p>
            <p>Phone: <a href="tel:+1234567890">8870770296</a></p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WorkerHome;
