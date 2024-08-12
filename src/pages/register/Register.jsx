import React, { useState } from 'react';
import './register.css';
import background from '../../assest/banner.jpg';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
    terms: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.terms) {
      alert('You must agree to the terms and privacy policy');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/register', formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed!');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await axios.post('http://127.0.0.1:8000/api/google-login', {
          token: tokenResponse.credential,
        });
        alert('Google Sign-In successful!');
        navigate('/');
      } catch (error) {
        console.error(error);
        alert('Google Sign-In failed!');
      }
    },
    onError: () => {
      alert('Google Sign-In failed!');
    },
  });

  return (
    <section className="registration">
      <img src={background} alt="register-background" />
      <div className="overlay"></div>
      <div className="registration-box">
        <h2 style={{ textAlign: 'center' }} className="registration-heading">Registration</h2>
        <div className='signin-container'>
          <button className="google-signin" onClick={() => googleLogin()}>
            <FcGoogle className="icon" /> Sign in with Google
          </button>
        </div>
        <div className="separator">
          <span>or</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" name="full_name" placeholder="Full name" className="input-field" value={formData.full_name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email address" className="input-field" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="password" name="password" placeholder="Password" className="input-field" value={formData.password} onChange={handleChange} required />
            <input type="password" name="password_confirmation" placeholder="Confirm password" className="input-field" value={formData.password_confirmation} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="tel" name="phone_number" placeholder="Phone number" className="input-field1" value={formData.phone_number} onChange={handleChange} required />
          </div>
          <div className="terms-container">
            <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} />
            <label htmlFor="terms">
              I agree to the <a href="/">terms</a> of use and <a href="/">privacy policy</a>
            </label>

            <div className='signup-button'>
              <label htmlFor="terms">
                Already have an account ?<a href="/Login">Sign in</a>
              </label>
            </div>
          </div>
          <button type="submit" className="submit-button">SIGN UP</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
