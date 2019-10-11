import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


export const registerUser = (userData, history) => async dispatch => {
    try {
        console.log(userData);
        let res = await axios.post('/api/users/register', userData);
        history.push('/login');
    } catch (err) {
        console.log(err,'hi', err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const loginUser = (userData) => async dispatch => {

    try {
        let res = await axios.post('/api/users/login', userData);
        const {token} = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));

    } catch (err) {
        console.log(err.response.data);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const setCurrentUser = (decoded)=>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = ()=>dispatch=>{
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}))

}