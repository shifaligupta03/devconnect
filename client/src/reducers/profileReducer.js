import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  SEND_CONNECT_REQUEST,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

export default function(state = initialState, action) {
  console.log({state, action});
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case SEND_CONNECT_REQUEST:
      const newState = Object.assign({}, state);
      newState.profile.user = action.payload;
      return {
        profile: newState.profile,
        loading: false,
      };
    default:
      return state;
  }
}
