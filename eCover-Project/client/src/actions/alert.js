import { SET_ALERT, REMOVE_ALERT } from './types';


// set alert message for warning for 2s
export const setAlert = (msg, alertType, timeout = 2000) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT}), timeout);
};
