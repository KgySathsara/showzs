/* eslint-disable react-hooks/rules-of-hooks */
// src/pages/NotFound/NotFound.js
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const error500 = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>500 - Page Not Found</h1>
      <p style={styles.message}>The page you are looking for does not exist.</p>
      <Button type="primary" onClick={goHome}>Go Home</Button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '48px',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '24px',
    margin: '20px 0',
    color: '#ff0000', // Change this color value to whatever you prefer
  },
};

export default error500;
