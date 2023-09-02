import React from 'react';
import Navbar from '../../Components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ActivityForm from '../../Components/ActivityForm';
import ActivityDashboard from '../../Components/ActivityDashboard';
import ActivityDetail from '../../Components/ActivityDetails';


function App() { 
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' ? <Navbar /> : null}
      {/* <Navbar /> */}

      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/activities' Component={ActivityDashboard} />
        <Route path='/activities/:id' Component={ActivityDetail} />
        <Route path='/create-activity' Component={ActivityForm} />
        <Route key={location.key} path='/edit/:id' Component={ActivityForm} />
      </Routes>
    </>
  );
}

export default App;
