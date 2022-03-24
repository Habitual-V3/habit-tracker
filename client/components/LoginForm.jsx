import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { link } from 'react-router-dom';

const LoginForm = (props) => {
  const navigate = useNavigate();
  
  function submitForm () {
    const email = document.querySelector('#username-input').value;
    const password = document.querySelector('#password-input').value;
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password})
    }
    
    // console.log('here', props.getFeed)
    fetch('http://localhost:3000/login', reqOptions)
    .then(res => {
      return res.json()
    })
    .then((authStatus) => {
      console.log("-----",authStatus)
      if (authStatus.userid){
        // get state data from db
        // post a new request 
        const req= 
        {
          method: 'POST',
         headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: authStatus.userid }),
        }
        
        fetch('http://localhost:3000/feed', req)
        .then(res => res.json())
        .then(data=> {
          console.log('login form data: ', data)
          props.getFeed({...data, userId: authStatus.userid})
          navigate('/feed')
          }
        )

      } // to close 25

    })  // to close 23
  } // to close 9

  function signupForm () {
    navigate('/signup');
  }

  return (
    <div id='login-form'>
      <h1>Habitual</h1>
      {/* <Link to="/feed">About</Link> */}
      <div className='wrapper-login'>
        <input autoComplete="off" type='text' className='login-input' id='username-input' name='username-input' placeholder='Email' />
        <input autoComplete="off" type='password' className='login-input' id='password-input' name='password-input' placeholder='Password' />
        <button className='login-btn' id='login-btn'
          onClick={submitForm}
        >Login</button>
        <div className='login-link' id='signup-btn' onClick={signupForm}>Don't have an account? <br></br>Signup</div>
      </div>
    </div>
  );
};

export default LoginForm;