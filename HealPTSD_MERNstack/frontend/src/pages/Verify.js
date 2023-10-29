import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeftRectangle from '../component/LeftRectangle';
import Logo from '../component/Logo';
import {useNavigate } from 'react-router-dom';

const Verify = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    // Extract the user ID from the query string (you may need to modify this)
    const userId = new URLSearchParams(window.location.search).get('id');

    // Make an API request to trigger email verification
    axios.post(`/api/verify?id=${userId}`)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage('An error occurred during verification');
        navigate('/')
      });
  }, []);

  return (
    <div>
      <h1>Verification Page</h1>
      <div className="container-fluid">
        <div className="row">
          <LeftRectangle />
          <div className="col-8 right-rectangle">
            <Logo/>
            <p className='verify-heading'>{message}</p>
            <img className='verified-icon' src={require('../img/verified.png')} alt="verification icon" /> <br />
            <button className='after-verify-button' onClick={handleLogin}>Login to your account now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;