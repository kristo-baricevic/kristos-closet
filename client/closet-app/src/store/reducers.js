const initialState = {
    isAuthenticated: false,
    user: null,
    isRegistrationModalVisible: false,
    isLoginModalVisible: false,
    registrationError: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_USER_SUCCESS':
      return {
        ...state,
        user: action.payload.user, 
        registrationError: null,   
      };
    case 'REGISTER_USER_ERROR':
      return {
        ...state,
        registrationError: action.payload, 
      };
      case 'SET_AUTHENTICATION':
        return {
          ...state,
          isAuthenticated: action.payload,
        };
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        };
      case 'CLEAR_AUTHENTICATION':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      case 'SET_REGISTRATION_MODAL_VISIBLE':
        return {
          ...state,
          isRegistrationModalVisible: action.payload,
        };
      case 'SET_LOGIN_MODAL_VISIBLE':
        return {
          ...state,
          isLoginModalVisible: action.payload,
        };
      case 'LOGIN_USER_SUCCESS':
        return {
          isAuthenticated: true,
          token: action.payload,
          user: action.payload,
        };
      case 'LOGOUT_USER':
        return {
          isAuthenticated: false,
          token: null,
          user: null,
        };
  
      default:
        return state; 
    }
  };
  
export default reducer;
  
  