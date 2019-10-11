import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, GET_ERRORS, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

export const getCurrentProfile = () => async dispatch => {
    dispatch(setProfileLoading());
    try {
        let res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    }
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}