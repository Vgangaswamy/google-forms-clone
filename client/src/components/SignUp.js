import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css'; 

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { username, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);

      toast.success('Registration successful!', {
        position: "top-right", 
      });

      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error) {
      toast.error('Registration failed. Please try again.', {
        position: "top-right", 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={onChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit" disabled={isSubmitting}>Register</button>
      </form>
      <p>Already registered? <a href="/signin">Sign In</a></p>
    </div>
  );
};

export default SignUp;
