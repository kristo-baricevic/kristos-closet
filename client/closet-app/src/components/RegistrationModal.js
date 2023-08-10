import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../store/actions'; 

const RegistrationModal = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isRegistrationModalVisible = useSelector(state => state.isRegistrationModalVisible);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch({ type: 'SET_REGISTRATION_MODAL_VISIBLE', payload: false });
  };

  const handleRegisterUser = async () => {
    try {
      const userData = {
        username,
        email,
        password,
      };

      await dispatch(registerUser(userData));
      console.log('User registered successfully!');
      handleCloseModal();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className={`modal ${isRegistrationModalVisible ? 'modal-visible' : ''}`}>
      <div className="modal-content">
        <h2>Register</h2>
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="submit-button" type="submit" onClick={handleRegisterUser}>Register</button>
        </form>
        <button className="close-button-register" onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default RegistrationModal;
