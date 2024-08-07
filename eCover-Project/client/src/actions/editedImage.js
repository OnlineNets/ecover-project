import { SET_EDITEDIMAGE, GET_EDITEDIMAGE, SET_IMGURL, SET_CURRENTSTATE, TOGGLE_PLUGCOVER } from './types';

// set edited image from output of react filerobot image editor package
export const setEditedImage = (image) => async (dispatch) => {
  dispatch({
    type: SET_EDITEDIMAGE,
    payload: image
  });
};

// set current state of react filerobot image editor
export const setCurrentState = (state) => async (dispatch) => {
  // const curState = {...state};
  // if(curState.selectionsIds){
  //   curState.selectionsIds = [];
  // }
  dispatch({
    type: SET_CURRENTSTATE,
    payload: state
  });
};

// get edited image from output of react filerobot image editor
export const getEditedImage = () => async (dispatch) => {
  dispatch({
    type: GET_EDITEDIMAGE
  });
};

// toggle whether cover is selected
export const togglePlugCover = () => (dispatch) => {
  dispatch({
    type: TOGGLE_PLUGCOVER
  });
}

// add uploaded image url to redux state
export const addUploadedImage = (imageUrl) => (dispatch) =>{
  dispatch({
    type: SET_IMGURL,
    payload: imageUrl
  })
}