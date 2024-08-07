import React, { Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';

// Dashboard component connected with dashboard page

const DashBoard = ({
  auth: { user },
  isAuthenticated
}) => {

  if (!isAuthenticated) {
    // return <Navigate to='/login' />;
    return <Navigate to='/' />;
  }
  
  return (
    <Fragment>
      <div className='container'>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'>Welcome {user && user.name}</i>
      </p>
      <Fragment>
        <p className='text-primary' style={{fontSize: '1.5rem', marginBottom: '5px'}}><i>Atomic eCovers provides functionality for creating 3d software boxes,</i></p>
        <p className='text-primary' style={{fontSize: '1.5rem'}}><i> ebook covers and more.</i></p>
        <Link to='/create-cover' className='btn btn-primary my-1' style={{marginTop: "40px"}}>
          Create Cover
        </Link>

      </Fragment>
      </div>
    </Fragment>
  );
};

DashBoard.propTypes = {
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { })(
  DashBoard
);
