import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';

// Landing component connected main page
export const Landing = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector(state=>state.auth);
  useEffect(()=>{
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  },[])
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Atomic eCovers</h1>
          <p className='lead'>
          Craft Stunning 3D Visuals for Your Online Products. 
          </p>

          <div className='buttons'>
            {/* <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link> */}
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Landing;
