import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();

  function loginForm () {
    navigate('/')
  }

  function signupFunc () {
    const firstname = document.getElementById('firstname-input').value;
    const lastname = document.getElementById('lastname-input').value;
    const username = document.getElementById('username-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({firstName: firstname, lastName: lastname, username: username, email: email, password: password})
    })
    .then(res => {
      return res.json()
    })
    .then((res) => {
        navigate('/')
    }) 
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
