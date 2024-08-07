import { BG_LOADING, SET_BACKGROUND, SET_COLOR } from '../actions/types';

const initialState = {
  color : null,
  url : null,
  loading : false
};

function selectBackground(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case BG_LOADING:
        return {...state, loading : true};
    case SET_BACKGROUND :
        return {...state, url : payload.url, index : payload.index, width: payload.width, height: payload.height, loading: false, color: null};
    case SET_COLOR:
        return {...state, color : payload, url: null}
    default : 
        return state;
  }
}

export default selectBackground;
