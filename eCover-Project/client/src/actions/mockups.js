import { MOCKUP_LOADING, SET_MOCKUPS, SELECT_MOCKUP, SET_MOCKUPDATA } from './types';
import axios from 'axios';
import { backendUrl } from '../utils/Constant';

//select working mockup
export const selectMockUp = (data) => async (dispatch) => {
  dispatch({
    type: MOCKUP_LOADING
  })
  // const options = {
  //   method: 'GET',
  //   url: `https://api.mediamodifier.com/mockup/nr/${nr}`,
  //   headers: {Accept: 'application/json', api_key: '7279b6bf-f931-4b94-a7bd-05deb552e3cb'}
  // };
  // const {data} = await axios.request(options);
  dispatch({
    type: SET_MOCKUPS,
    //payload: data
    payload:  true
  })
};

//select working mockup
export const selectingMockup = (data) => (dispatch) =>{
  dispatch({
    type: MOCKUP_LOADING
  })
  dispatch({
    type: SELECT_MOCKUP,
    payload: data
  })
}

//get mockupdata through api and set it
export const setMockupData = (mockups) => async (dispatch) => {
  try{
    const res = await axios.post(`${backendUrl}/api/ag-psd/all-mockup`, {mockups});
    dispatch({
      type: SET_MOCKUPDATA,
      payload: res.data
    })
  }catch(err){
    console.log(err);
  }
}