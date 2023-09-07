import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import ActivityForm from '../../Components/ActivityForm';
import ActivityDashboard from '../../Components/ActivityDashboard';
import ActivityDetail from '../../Components/ActivityDetails';
import LoginPage from '../../pages/user/LoginPage';
import NotFoundPage from '../../pages/error/404';
import { useStore } from '../stores/store';
import Loading from '../../Components/Loading';
import { observer } from "mobx-react-lite";
import { CSSTransition } from 'react-transition-group';


function App() { 
  const location = useLocation();
  const {commonStore, userStore, modalStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);
  
  const {modalOpen} = modalStore;

  return (
    <>
      {location.pathname !== '/' ? <Navbar /> : null}
      
      {!commonStore.appLoaded && <Loading text="Loading App" />}

      <CSSTransition
        in={modalOpen}
        classNames='fade'
        timeout={300}
        unmountOnExit
      >
        <LoginPage />
      </CSSTransition>

      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/activities' Component={ActivityDashboard} />
        <Route path='/activities/:id' Component={ActivityDetail} />
        <Route path='/create-activity' Component={ActivityForm} />
        <Route key={location.key} path='/edit/:id' Component={ActivityForm} />
        
        <Route path='/not-found' Component={NotFoundPage} />
      </Routes>
      
    </>
  );
}

export default observer(App);
