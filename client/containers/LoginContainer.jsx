import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import LoginForm from '../components/LoginForm.jsx';

const mapStateToProps = state => ({
  userId: state.habits.userId,
  calendar: state.habits.userId
})

const mapDispatchToProps = (dispatch) => {
  return {
      getFeed: (data) => dispatch(actions.getFeedActionCreator(data)),
  }
};

class LoginContainer extends Component {
  constructor(props) {
    super(props);
  };

  render () { 
    return (
      <div>
        <LoginForm getFeed={this.props.getFeed}/>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (LoginContainer);