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
  

  export const loginAnonymous = () => async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register');
      console.log('Response data:', response.data);
  
      const isAuthenticated = response.data.isAuthenticated;
      const user = response.data.user;
      const token = response.data.token;
  
      // Save token in local storage
      localStorage.setItem('token', token);
  
      // Include JWT token
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Make another request to the backend with the JWT token included
      const userResponse = await axios.get('/backend/User/current', {
        headers: headers,
      });
  
      const authenticatedUser = userResponse.data;
      console.log('Authenticated user: ', authenticatedUser);
  
      // Dispatch actions to update the Redux store
      dispatch({ type: 'SET_AUTHENTICATION', payload: isAuthenticated });
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };
  
  