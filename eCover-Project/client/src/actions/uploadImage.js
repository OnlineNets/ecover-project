import { UPLOAD_IMAGE, UPLOAD_IMAGE_LOADING, GET_UPLOAD_IMAGES } from './types';
import axios from 'axios';
import { backendUrl } from '../utils/Constant';

//add uploaded image url to redux state
export const uploadImage = (image) => async (dispatch) => {
  dispatch({
    type: UPLOAD_IMAGE,
    payload: image
  });
};

//get uploaded image urls from backend
export const getUploadImages = () => async (dispatch) => {
  dispatch({
    type: UPLOAD_IMAGE_LOADING
  });
  
  try{
    const res = await axios.get(`${backendUrl}/api/ag-psd/all-upload-image`);
    dispatch({
      type: GET_UPLOAD_IMAGES,
      payload: res.data
    });

  }catch(err){
    console.log(err)
  }
}
