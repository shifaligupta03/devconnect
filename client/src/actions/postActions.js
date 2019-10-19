import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
} from './types';

export const addPost = postData => async dispatch => {
  dispatch(clearErrors());
  try {
    let res = await axios.post('/api/posts', postData);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getPosts = () => async dispatch => {
  // dispatch(setPostLoading());
  try {
    let res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_POSTS,
      payload: null,
    });
  }
};

export const getPost = id => async dispatch => {
  dispatch(setPostLoading());
  try {
    let res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_POST,
      payload: null,
    });
  }
};

// Delete Post
export const deletePost = id => async dispatch => {
  try {
    let res = await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const addLike = id => async dispatch => {
  try {
    let res = await axios.post(`/api/posts/like/${id}`);
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const removeLike = id => async dispatch => {
  try {
    let res = await axios.post(`/api/posts/unlike/${id}`);
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const addComment = (postId, commentData) => async dispatch => {
  dispatch(clearErrors());
  try {
    let res = await axios.post(`/api/posts/comment/${postId}`, commentData);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    let res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
