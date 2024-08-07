import { FINAL_LOADING, RENDER } from '../actions/types';

const initialState = {
  url : null,
  loading : false
};

function render_start(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FINAL_LOADING:
        return {...state, loading : true};
    case RENDER :
        return {...state, url : payload.url, loading: false};
    default : 
        return state;
  }
}

export default render_start;
