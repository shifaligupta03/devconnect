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

//
export const getProfileByUsername = (handle) => async dispatch => {
  dispatch(setProfileLoading());
  try {
    let res = await axios.get(`/api/profile/handle/${handle}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: null,
    });
  }
};



// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
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

export const addExperience = (expData, history) => async dispatch =>{
  try {
    let res = await axios.post('/api/profile/experience', expData);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
}

export const addEducation = (eduData, history) => async dispatch =>{
  try {
    let res = await axios.post('/api/profile/education', eduData);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
}

export const deleteExperience = (id) => async dispatch => {
    if (window.confirm('Are you sure you want to delete your experience?')) {
      let res = await axios.delete('/api/profile/experience/'+id);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    }
};

export const deleteEducation = (id) => async dispatch => {
  if (window.confirm('Are you sure you want to delete your experience?')) {
    let res = await axios.delete('/api/profile/education/'+id);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  }
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
