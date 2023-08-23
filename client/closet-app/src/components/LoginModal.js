import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginModalVisibility, setLoginModalVisible } from '../features/modalSlice';
import axios from 'axios';

const LoginModal = () => {
  const isLoginModalVisible = useSelector(LoginModalVisibility);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCloseModal = () => {
    dispatch(setLoginModalVisible(false)); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      console.log('Login successful:', response.data);

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
