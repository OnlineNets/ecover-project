import React, { Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../workpages/MockupsPage.css';
import { PUBLIC_URL } from '../../utils/Constant';
import { Divider } from '@mui/material';

//// Mockups component connected with Mockups page
const Mockups = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth) || {};
  const mockUpData = useSelector(state=>state.mockUpData) || {};

  if (!isAuthenticated) {
    // return <Navigate to="/login" />;
    return <Navigate to='/' />;
  }

  return (
    <Fragment>
      <div className="container">
        <h1 className="large text-primary">My Mockups</h1>
        <p className="lead">
          <i className="fas fa-user">Welcome {user && user.name}</i>
        </p>

        <div className="mockupGroup" style={{ paddingTop: '20px', paddingBottom: '30px' }}>
          { mockUpData.map((group, key) => {
              return( 
                  <div style={{ marginTop: '20px' }}  key = {key}>
                  <Divider textAlign="left">Mockup Group - {group.group}</Divider>
                  <div className="mockupGroup">
                  {group.mockups.map((mockup, key) => {
                      return (
                          <div  key = {key}>
                              <img 
                                  className = "image-card"
                                  src = { PUBLIC_URL + `/mockup/${mockup}.png`}
                                  alt="mockup image" 
                                  width={300} 
                              />
                          </div>
                      )
                  })}
                  </div></div>
              );
              
          })}
        </div>

        <Fragment>
          {/* <p>You don't have a cover, please create one</p> */}
          <Link to="/create-cover" className="btn btn-primary my-1">
            Create Cover
          </Link>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Mockups;