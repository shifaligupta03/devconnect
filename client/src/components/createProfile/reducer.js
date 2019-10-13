export default function createProfileReducer(state, action) {
    switch (action.type) {
      case 'edit':
        const newState = {
          ...state,
          ...action.payload,
        };
        return newState;
      case 'input':
        return {
          ...state,
          [action.name]: action.value,
        };
    }
  }
  