import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import JobPost from './Components/JobPost';
import JobDetails from './Components/JobDetails'; 
import JobFilter from './Components/JobFilter';
import LogContext from './Utilities/LogContext';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [logged, setLogged] = useState(false);
 
  return (
    <>
    <LogContext.Provider value={[logged, setLogged]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobpost" element={<JobPost />} />
        <Route path="/edit_job/:id" element={<JobPost/>} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/job_description/:id" element={<JobDescription />} /> 
         {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
      </LogContext.Provider>
    </>
  );
};


const Home = () => {
  return (
    <>
      <Navbar />
      <JobFilter />
    </>
  );
};


const JobDescription = () => {
  return (
    <>
      <Navbar />
      <JobDetails />
    </>
  );
};

export default App;
