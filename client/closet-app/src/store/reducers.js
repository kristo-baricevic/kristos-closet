// const initialState = {
//     isAuthenticated: false,
//     user: null,
//     isRegistrationModalVisible: false,
//     isLoginModalVisible: false,
//     registrationError: null,
//   };
  
//   const reducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'REGISTER_USER_SUCCESS':
//       return {
//         ...state,
//         user: action.payload.user, 
//         registrationError: null,   
//       };
//       case 'REGISTER_USER_ERROR':
//         return {
//           ...state,
//           registrationError: action.payload, 
//         };
//       case 'SET_AUTHENTICATION':
//         return {
//           ...state,
//           isAuthenticated: action.payload,
//         };
//       case 'SET_USER':
//         return {
//           ...state,
//           user: action.payload,
//         };
//       case 'CLEAR_AUTHENTICATION':
//         return {
//           ...state,
//           isAuthenticated: false,
//           user: null,
//         };
//       case 'SET_REGISTRATION_MODAL_VISIBLE':
//         return {
//           ...state,
//           isRegistrationModalVisible: action.payload,
//         };
//       case 'SET_LOGIN_MODAL_VISIBLE':
//         return {
//           ...state,
//           isLoginModalVisible: action.payload,
//         };
//       case 'LOGIN_USER_SUCCESS':
//         return {
//           ...state,
//           isAuthenticated: true,
//           token: action.payload,
//           user: action.payload,
//         };
//       case 'LOGOUT_USER':
//         return {
//           isAuthenticated: false,
//           token: null,
//           user: null,
//         };
//       case 'UPLOAD_IMAGE_REQUEST':
//         return {
//           ...state,
//           isUploadingImage: true,
//           uploadError: null,
//         };
//       case 'UPLOAD_IMAGE_SUCCESS':
//         return {
//           ...state,
//           isUploadingImage: false,
//           uploadError: null,
//         };
//       case 'UPLOAD_IMAGE_FAILURE':
//         return {
//           ...state,
//           isUploadingImage: false,
//           uploadError: action.payload,
//         };
    
//       default:
//         return state; 
//     }
//   };
  
// export default reducer;
  
  