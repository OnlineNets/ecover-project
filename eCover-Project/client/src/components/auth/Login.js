import React, { Fragment, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

//Login component connected with login page
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email1: '',
    password1: '',
  });
  const alert = useSelector(state=>state.alert);

  const { email1, password1 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(()=>{

  },[])

  const onSubmit = (e) => {
    e.preventDefault();
    login(email1, password1);
  };


  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='container'>
      <h1 className='large text-primary'>Login</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> 
        User database is integrated with Atomic Gains's one, <br/>
        If you are already registered in there, you can use atomic gains login infor!
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
      <p className='my-1 text-primary' style={{marginTop: "20px"}}>
        <Link to='https://atomicgains.com/login.php?action=lost' target='_blank'>Reset password?</Link>
      </p>
      <p style = {{color: 'red'}}>
        {alert? alert.msg: ''}
      </p>
      </div>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
