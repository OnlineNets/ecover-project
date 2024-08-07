import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// PrivateRoute component for redirecting to login page if non-logged in user
const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
  <Route {...rest} element={!isAuthenticated && !loading ? 
    // <Navigate to='/login' /> 
    <Navigate to='/' />
    : 
    <Component />} />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);