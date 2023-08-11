import axios from "axios";

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
        console.log("inside login try");
        const response = await axios.post('http://localhost:5000/api/login', userData);

        if (response.status === 200) {
          dispatch({
            type: 'LOGIN_USER_SUCCESS',
            payload: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: 'LOGIN_USER_ERROR',
          payload: error.message,
        });        
      }
    };
  };
  
  export const loginSuccess = (user) => ({
    type: 'LOGIN_USER_SUCCESS',
    payload: user,
  });

  export const logoutUser = () => ({
    type: 'LOGOUT_USER', 
  });

  export const registerUser = (userData) => {
    console.log("registerUser has run");
    return async (dispatch) => {
      try {
        console.log("userData about to post");
        const response = await axios.post('http://localhost:5000/api/register', userData);
        console.log("userData posted");
  
        if (response.status === 201) {
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
  
  