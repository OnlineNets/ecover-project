import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
// import Register from './components/auth/Register';
import LoginToken from './components/auth/LoginToken';
import Login from './components/auth/Login';
import CreateCover from './components/WorkPlace/CreateCover';
import DashBoard from './components/dashboard/Dashboard';


// Redux
import { Provider } from 'react-redux';
import {persistor, store} from './store';
import { PersistGate } from 'redux-persist/integration/react';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Mycovers from './components/mycovers/Mycovers';
import Mockups from './components/mockups/Mockups';
import AllUsers from './components/allusers/AllUsers';

//import logo from './logo.svg';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  const[loadPreDesign, setLoadPreDesign] = useState({
    renderedImage: null, 
    designState: {},
  })
 
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Fragment>
            <Navbar />
            <Routes>
              <Route path='/' element={<Landing />} />
              {/* <Route path='/register' element={<Register />} /> */}
              <Route path='/login-atgains/:token' element={<LoginToken />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path='/login' element={<Login />} /> */}
              <Route path='/dashboard' element={<DashBoard />} />
              <Route path='/create-cover' element={<CreateCover loadPreDesign={loadPreDesign} setLoadPreDesign={setLoadPreDesign}/>} />
              <Route path='/mycovers' element={<Mycovers setLoadPreDesign={setLoadPreDesign}/>} />
              <Route path='/mockups' element={<Mockups />} />
              <Route path='/all-users' element={<AllUsers />} />
            </Routes>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
