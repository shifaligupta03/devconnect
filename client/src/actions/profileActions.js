import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_ERRORS,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
} from './types';

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    let res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: {},
    });
  }
};

export const createProfile = (profileData, history) => async dispatch => {
  try {
    let res = await axios.post('/api/profile', profileData);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

export const deleteAccount = () => async dispatch => {
  try {
    if (window.confirm('Are you sure you want to delete your account?')) {
      let res = await axios.delete('/api/profile');
      dispatch({
        type: SET_CURRENT_USER,
        payload: {},
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
