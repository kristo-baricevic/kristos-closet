import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions';

const LoginModal = () => {
  const dispatch = useDispatch();
  const isAuthenticated = userSelector((state) => state.auth.isAuthenticated);
  const isLoginModalVisible = useSelector(state => state.isLoginModalVisible);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    const userData = {
      username,
      password
    };

    dispatch(loginUser(userData))
      .then(response => {
        console.log('response:', response);
        handleCloseModal();
      })
      .catch(error => {
        console.error('Login failed:', error);
        console.log(userData);
      });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'SET_LOGIN_MODAL_VISIBLE', payload: false });
    console.log("close");
  };

  return (
    <div className={`modal ${isLoginModalVisible ? 'visible' : ''}`}>
      <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-button" type="button" onClick={handleLogin}>Login</button>
        </form>
        <button className="close-button-login" onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
