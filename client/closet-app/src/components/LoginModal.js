import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, closeLoginModal } from '../store/actions';

const LoginModal = () => {
  const isLoginModalVisible = useSelector(state => state.isLoginModalVisible);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCloseModal = () => {
    dispatch(closeLoginModal()); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ 
        username: username,
        password: password,
      }));

      handleCloseModal();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={`login-modal ${isLoginModalVisible ? 'visible' : ''}`}>
      <div className="login-modal-content">
        <h2 className="login-header">Login</h2>
        <form className="login-form" onSubmit={(e) => handleLogin(e)}>
          <div className="login-form-group">
            <label className="login-label" htmlFor="username">Username:</label>
            <input
              className="login-input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-form-group">
            <label className="login-label" htmlFor="password">Password:</label>
            <input
              className="login-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button className="login-button" type="submit">Login</button>
        </form>
        <button className="login-close-button" onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
