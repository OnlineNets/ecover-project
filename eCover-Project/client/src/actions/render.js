import { RENDER, FINAL_LOADING, RENDERED } from "./types";

//set render start plug as true
export const render_start = () => async (dispatch) => {
    dispatch({
        type: FINAL_LOADING
    });
};

//set render start plug as false
export const render_end = () => async (dispatch) => {
    dispatch({
        type: RENDER,
        payload: ""
    });
    dispatch({
        type: RENDERED,
        payload: ""
    })
};