import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store.js';

import './styles/styles.scss';

import FeedContainer from './containers/FeedContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import SignupContainer from './containers/SignupContainer.jsx';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={ <LoginContainer/> } />
        <Route exact path='/feed' element={ <FeedContainer/> } />
        <Route exact path='/signup' element={ <SignupContainer/> } />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Provider store = { store }>
    <AppRouter/>
  </Provider>, 
  document.getElementById('root')
);

