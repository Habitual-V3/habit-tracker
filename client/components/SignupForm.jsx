import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();

  function loginForm () {
    navigate('/')
  }

  function signupFunc () {
    const firstname = document.querySelector('#firstname-input').value;
    const lastname = document.querySelector('#lastname-input').value;
    const username = document.querySelector('#username-input').value;
    const email = document.querySelector('#email-input').value;
    const password = document.querySelector('#password-input').value;

    // CHANGE ME TO DO THIS ON SUCCESSFUL USER CREATION
    if (true) {
      navigate('/feed')
    }
  }

  return (
    <div className='signup-form'>
      <h1>Habitual</h1>
      <div className='wrapper-signup'>
        <div className='signup-text'>Please enter the following to create your account:</div>
        <input autoComplete="off" type='text' className='login-input signup-input' id='username-input' name='username-input' placeholder='Enter Username' />
        <div className='signup-name-input'>
          <input autoComplete="off" type='text' className='login-input signup-input' id='firstname-input' name='firstname-input' placeholder='Enter First Name' />
          <input autoComplete="off" type='text' className='login-input signup-input' id='lastname-input' name='lastname-input' placeholder='Enter Last Name' />
        </div>
        <input autoComplete="off" type='text' className='login-input signup-input' id='email-input' name='email-input' placeholder='Enter Email' />
        <input autoComplete="off" type='password' className='login-input signup-input' id='password-input' name='password-input' placeholder='Enter Password' />
        <button className='login-btn' id='login-btn' onClick={signupFunc}>Signup</button>
        <div className='login-link' id='login-btn' onClick={loginForm}>
          Already have an account? <br></br>Login
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
