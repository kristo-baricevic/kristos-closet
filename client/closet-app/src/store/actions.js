// actions.js

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

  export const loginUser = (userData) => ({
    type: 'LOGIN_USER',
    payload: userData,
  });
  
  export const logoutUser = () => ({
    type: 'LOGOUT_USER', // You can define this action type as needed
  });

  export const registerUser = (userData) => ({
    type: 'REGISTER_USER',
    payload: userData,
  });
  
  
  export const loginAnonymous = () => ({
    type: 'LOGIN_ANONYMOUS', // You can define this action type as needed
  });
  
  