import React from 'react';
import { useDispatch } from 'react-redux';
import { loginAnonymous } from '../store/actions'; 

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
