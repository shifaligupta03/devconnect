export default function registerReducer(state, action) {
    switch (action.type) {
      case 'input':
        return {
          ...state,
          [action.name]: action.value,
        };
    }
  }
  