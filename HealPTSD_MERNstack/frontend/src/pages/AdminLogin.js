import React, { useState } from 'react';
import axios from 'axios';
import LeftRectangle from '../component/LeftRectangle';
import Logo from '../component/Logo';
import {useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  

  const { email, password } = values;

  const handleChange = name => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminLogin = await axios.post('/api/admin', {
        email,
        password,
      });

      if (adminLogin.data.message) {
        setMessage(adminLogin.data.message);
      } else {
        setValues({
          email: '',
          password: '',
        });

        localStorage.setItem('token', adminLogin.data.token)

        navigate('/admin/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <LeftRectangle />
          <div className="col-8 right-rectangle">
            <Logo />
            <div className="registration-form" style={{marginTop:"13%"}}>
              <h2 className="create-account-heading">Admin Login</h2>
              <form action="/" method="post" onSubmit={handleSubmit}>

                <div className="name-inputs">
                  <div className="name-input">
                    <label className="top-label-email input-field-font" htmlFor="email">Email</label>
                    <input onChange={handleChange("email")} className="top-input big-input-field" type="email" name="email" value={email} required /><br />
                  </div>
                </div>

                <div className="name-inputs" style={{ marginTop: '-2.3%' }}>
                  <div className="name-input">
                    <label className="top-label-password input-field-font" htmlFor="password">Password</label>
                    <input onChange={handleChange("password")} className="top-input big-input-field" type="password" name="password" value={password} required /><br />
                  </div>
                </div>

                <input type="submit" value="Login" className="submit-button" />
              </form>
            </div>
            <div className="inline-elements">
              <p className="foot-text-one">Don't have an account?</p>
              <a href="/register" className="foot-text-two">Signup</a>
            </div>
            {message && <p className='message-display'>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;