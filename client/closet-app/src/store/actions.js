const axios = require('axios');

export const setAuthentication = (isAuthenticated) => ({
    type: 'SET_AUTHENTICATION',
    payload: isAuthenticated,
  });
  
  export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  export const clearAuthentication = () => ({
    type: 'CLEAR_AUTHENTICATION',
  });
  
  export const showLoginModal = () => ({
    type: 'SET_LOGIN_MODAL_VISIBLE',
    payload: true,
  });
  
  export const closeLoginModal = () => ({
    type: 'SET_LOGIN_MODAL_VISIBLE',
    payload: false,
  });
  
  export const showRegistrationModal = () => ({
    type: 'SET_REGISTRATION_MODAL_VISIBLE',
    payload: true,
  });
  
  export const closeRegistrationModal = () => ({
    type: 'SET_REGISTRATION_MODAL_VISIBLE',
    payload: false,
  });

  export const setRegistrationModalVisible = (visible) => ({
    type: 'SET_REGISTRATION_MODAL_VISIBLE',
    payload: visible,
  });
  
  export const setLoginModalVisible = (visible) => ({
    type: 'SET_LOGIN_MODAL_VISIBLE',
    payload: visible,
  });

  export const loginUser = (userData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('http://localhost:3000/login', userData);

        if (response.status === 200) {
          dispatch({
            type: 'LOGIN_USER_SUCCESS',
            payload: response.userData,
          });
        }
      } catch (error) {
        dispatch({
          type: 'LOGIN_USER_ERROR',
          payload: response.data,
        });        
      }
    };
  };
  
  export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
  });

  export const logoutUser = () => ({
    type: 'LOGOUT_USER', 
  });

  export const registerUser = (userData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('http://localhost:3000/register/register', userData);
  
        if (response.status === 200) {
          dispatch({
            type: 'REGISTER_USER_SUCCESS',
            payload: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: 'REGISTER_USER_ERROR',
          payload: error.message,
        });
      }
    };
  };
  
  
  export const loginAnonymous = () => ({
    type: 'LOGIN_ANONYMOUS', 
  });
  
  