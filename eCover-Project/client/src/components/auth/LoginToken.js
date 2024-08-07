import React, { Fragment, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { LOGIN_SUCCESS } from '../../actions/types';
import { loadUser } from '../../actions/auth';

// LoginToken component for login from token
const LoginToken = ({ login, isAuthenticated }) => {
  const {token} = useParams();

  const dispatch = useDispatch();
  useEffect(()=>{
    // if(email && password) login(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: token
      }
    });
    dispatch(loadUser());
  },[])

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Fragment>
      {/* <div className='container'>
      <h1 className='large text-primary'>Login</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Login to Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email1'
            value={email1}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password1'
            value={password1}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Log In' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
      <p style = {{color: 'red'}}>
        {alert? alert.msg: ''}
      </p>
      </div> */}
    </Fragment>
  );
};
LoginToken.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(LoginToken);
