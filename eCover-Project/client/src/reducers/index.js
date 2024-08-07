import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import selectBackground from './selectBackground';
import mockUpData from './mockUpData';
import render_start from './render';
import uploadImage from './uploadImage';
import workingMockup from './workingMockup';
import editedImage from './editedImage';

export default combineReducers({
  alert,
  auth,
  profile,
  selectBackground,
  mockUpData,
  render_start,
  uploadImage,
  workingMockup,
  editedImage,
});
