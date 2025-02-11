import axios from 'axios';
import { setAlert } from './alert';
import { backendUrl } from '../utils/Constant';
import { getUploadImages } from './uploadImage';
import { setMockupData } from './mockups';
import { mockups } from '../utils/Constant';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load current user data from database
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${backendUrl}/api/auth`);
    
    if(res.data){
      dispatch({
         type: USER_LOADED,
         payload: res.data,
      });
    }
    dispatch(getUploadImages());
    dispatch(setMockupData(mockups));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register new user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(`${backendUrl}/api/users`, body, config);

    if(res.data){
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    }  
  } catch (err) {
    console.log(err);

    if (err.response) {
      err.response.data.errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login function
export const login = (email, password) => async (dispatch) => {
  console.log(backendUrl, "ddd");
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${backendUrl}/api/auth`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    if (err.response) {
      err.response.data.errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout /Clear Profile

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  localStorage.removeItem('token');
};
