import axios from "axios";


//set authentication status
export const setAuthentication = (isAuthenticated) => ({
    type: 'SET_AUTHENTICATION',
    payload: isAuthenticated,
  });

//set user data
export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

//clear authentication status  
export const clearAuthentication = () => ({
  type: 'CLEAR_AUTHENTICATION',
});
  
//manage modals
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

// upload action types
export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';

// Thunk action to log in user
export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      console.log("inside login try");
      const response = await axios.post('http://localhost:5000/api/login', userData);

      if (response.status === 200) {
        const user = response.data.user;
        const token = response.data.token; // Assuming the token is returned from the server
        console.log("user data", user);
        console.log("token", token);

        // Set the token in client storage
        localStorage.setItem('token', token);

        console.log("client side token", token);

        dispatch(loginSuccess(user));
        return console.log(user);
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_USER_ERROR',
        payload: error.message,
      });        
    }
  };
};

  
// action creator fo successful login
export const loginSuccess = (user) => ({
  type: 'LOGIN_USER_SUCCESS',
  payload: user,
});

// action creator fo successful logout
export const logoutUser = () => ({
  type: 'LOGOUT_USER', 
});

// Thunk action to register user
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

// Thunk action to perform anonymous login
export const loginAnonymous = () => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/loginAnonymous');
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
  
    // Dispatch actions to update the Redux store
    dispatch({ type: 'SET_AUTHENTICATION', payload: isAuthenticated });
    dispatch({ type: 'SET_USER', payload: user });
  } catch (error) {
    // Handle login error
    console.error('Login failed:', error);
  }
};

// Action creators for image upload
export const uploadImageRequest = () => ({
  type: UPLOAD_IMAGE_REQUEST,
});

export const uploadImageSuccess = () => ({
  type: UPLOAD_IMAGE_SUCCESS,
});

export const uploadImageFailure = error => ({
  type: UPLOAD_IMAGE_FAILURE,
  error,
});

// Thunk action to upload an image
export const uploadImage = (formData) => async dispatch => {
  dispatch(uploadImageRequest());

  try {
    const token = localStorage.getItem('token');
    console.log("token in upload image in actions.js", token);
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    console.log("token is", token);

    await axios.post('http://localhost:5000/api/upload', formData, { headers });

    dispatch(uploadImageSuccess());
  } catch (error) {
    dispatch(uploadImageFailure(error));
  }
};