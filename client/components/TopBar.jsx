import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const TopBar = (props) => {
    const navigate = useNavigate();

    function logoutClick () {
        // TODO: add functionality to log out user
        navigate('/');
    }
    function addHabit () {
        props.showModalAction();
    }

    return (
        <div className="topbar">
            <div id='logo'>H</div>
            <button id='add-hbt' onClick={addHabit}><span id="plus-icon">+&nbsp;</span>&nbsp;Add habit</button>
            <div id='link-logout' onClick={logoutClick}>
                Logout
            </div>
        </div>
    );
};

export default TopBar;
