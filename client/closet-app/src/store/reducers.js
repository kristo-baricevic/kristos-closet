const initialState = {
    isAuthenticated: false,
    user: null,
    isRegistrationModalVisible: false,
    isLoginModalVisible: false,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
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
  
      default:
        return state; 
    }
  };
  
export default reducer;
  
  