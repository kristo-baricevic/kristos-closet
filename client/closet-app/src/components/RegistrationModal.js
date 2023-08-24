import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../features/userSlice'; 
import { setRegistrationModalVisible, RegistrationModalVisibility } from '../features/modalSlice';

const RegistrationModal = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registrationModalVisible = useSelector(RegistrationModalVisibility);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setRegistrationModalVisible(false)); 
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

    <div className={`registration-modal ${registrationModalVisible ? 'modal-visible' : ''}`}>
      <div className="registration-modal-content">
        <h2 className="registration-header">Register</h2>
        <form>
          <div className="registration-form-group">
            <label className="registration-label" htmlFor="username">Username:</label>
            <input className="registration-input" type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="registration-form-group">
            <label className="registration-label" htmlFor="email">Email:</label>
            <input className="registration-input"
              type="email" 
              id="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="registration-form-group">
            <label htmlFor="password">Password:</label>
            <input className="registration-input"
              type="password" 
              id="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} required
            />
          </div>
          <button className="registration-submit-button" type="button" onClick={handleRegisterUser}>Register</button>
        </form>
        <button className="registration-close-button" onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default RegistrationModal;
