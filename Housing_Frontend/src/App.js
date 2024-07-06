import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import React from 'react';
import HomePage from './pages/Start';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/Adminlogin';
import UserRegistration from './pages/UserRegistration';
import AdminRegistrationPage from './pages/AdminRegistraion';
import UserRegistrationSucess from './pages/UserRegistrationSucess';
import AdminRegistrationSucess from './pages/AdminRegistrationSucess';
import Userhome from './pages/Userhome';
import Electrician from './pages/Electrician';
import Plumber from './pages/Plumber';
import Carpenter from './pages/Carpenter';
import Painter from './pages/Painter';
import Maid from './pages/Maid';
import Essentials from './pages/Essentials';
import Nearby from './pages/Nearby';
import Workerupdateprofile from './pages/Workerupdateprofile';
import WorkerHome from './pages/WorkerHome';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/userlogin' element={<UserLogin />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/userregis' element={<UserRegistration />} />
        <Route path='/adminregis' element={<AdminRegistrationPage />} />
        <Route path='/userregissuccess' element={<UserRegistrationSucess />} />
        <Route path='/adminregissuccess' element={<AdminRegistrationSucess />} />
        <Route path='/userhome' element={<Userhome />} />
        <Route path='/electrician' element={<Electrician/>} /> 
        <Route path='/plumber' element={<Plumber/>} /> 
        <Route path='/carpenter' element={<Carpenter/>} /> 
        <Route path='/painter' element={<Painter />} /> 
        <Route path='/maid' element={<Maid />} /> 
        <Route path='/essentials' element={<Essentials />} /> 
        <Route path='/nearby' element={<Nearby />} /> 
        <Route path='/workerupdateprofile' element={<Workerupdateprofile />} />
        <Route path='/workerhome' element={<WorkerHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
