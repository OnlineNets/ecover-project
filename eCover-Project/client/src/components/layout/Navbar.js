import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

// Navbar component
export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const {email} = useSelector(state=>state.auth.user) || {};

  const authLinks = (
    <ul>
      {email == "bluenets66@gmail.com" || email == "jacinto@unica.co.nz" || email == "me@marklingmail.com"?
      <li>
        <Link to='/all-users'>
          <span className='hide-sm'>All Users</span>
        </Link>
      </li>:''}
      <li>
        <Link to='/dashboard'>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='/mycovers'>
          <span className='hide-sm'>My Covers</span>
        </Link>
      </li>
      <li>
        <Link to='/mockups'>
          <span className='hide-sm'>Mockups</span>
        </Link>
      </li>
      {/* <li>
        <Link to='/createmockup'>
          <span className='hide-sm'>Create Mockups</span>
        </Link>
      </li> */}
      <li>
        <Link to='/create-cover'>
          <span className='hide-sm'>Create Cover</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='/'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      {/* <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li> */}
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> Atomic eCovers
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProp, { logout })(Navbar);
