import React from 'react';
import { useDispatch } from 'react-redux';
import { loginAnonymous } from '../features/userSlice'; 

const DemoButton = () => {
  const dispatch = useDispatch();

  const handleDemoLogin = () => {
    dispatch(loginAnonymous());
  };

  return (
    <button className="demo-button" onClick={handleDemoLogin}>Demo</button>
  );
};

export default DemoButton;
