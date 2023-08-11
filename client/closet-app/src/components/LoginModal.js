import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions';

const LoginModal = () => {

  const dispatch = useDispatch();
  const isLoginModalVisible = useSelector(state => state.isLoginModalVisible);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleCloseModal = () => {
    dispatch({ type: 'SET_LOGIN_MODAL_VISIBLE', payload: false });
    console.log("close");
  };

  const handleLogin = async () => {
    try {
      console.log("handleLogin ran");
      const userData = {
        username,
        password,
      };

      await dispatch(loginUser(userData));
      console.log('dispatch:', userData);
      handleCloseModal();
    } catch (error) {
        console.error('Login failed:', error);
      };
    };

  return (
    <div className={`login-modal ${isLoginModalVisible ? 'visible' : ''}`}>
      <div className="login-modal-content">
        <h2 className="login-header">Login</h2>
        <form>
          <div className="login-form-group">
            <label className="login-label" htmlFor="username">Username:</label>
            <input className="login-input"
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)} required
            />
          </div>
          <div className="login-form-group">
            <label className="login-label" htmlFor="password">Password:</label>
            <input className="login-input"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)} required
            />
          </div>
          <button className="login-button" type="button" onClick={handleLogin}>Login</button>
        </form>
        <button className="login-close-button" onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
