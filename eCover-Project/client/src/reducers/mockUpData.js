import { SET_MOCKUPDATA } from '../actions/types';

const persistedData = localStorage.getItem("persist:ecover");
const initialState = persistedData ? [JSON.parse(persistedData).mockUpData] : [];

function mockUpData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MOCKUPDATA :
        return payload 
    default : 
        return state;
  }
}

export default mockUpData;
