import React, { useState } from 'react';
import { connect } from 'react-redux';


const AddHabit = (props) => {
    
    if (!props.show) {
        return null;
    }

    function closeModal () {
        props.showModalAdd();
        console.log(props.show)
    }
    function addHabit () {
        //grab input text value
        //modal should close when user clicks submits
        //store to database
        let newHabit = document.getElementById('newhabit').value;
        let targetNum = document.getElementById('targetNumber').value;
        props.showModalAdd()

        fetch('http://localhost:3000/edithabit/add', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            //store to habits table
            body: JSON.stringify({userId: props.userId, habitName: newHabit, targetNum: targetNum, currentNum: 0}) 
            //server should insert to both habits & user_habits tables
        })
        .then(data => data.json())
        .then(data => {
            console.log('data from addhabit func: ', data)
            //data should include habit name
            //render new todo here
            props.addNewHabit(data)
        })
    }

    // const handleSelectChange = (e) => {
    //     console.log('hit');
    // }

    //
    return (
        <div className='modal-bg'>  
            <div className='modal'>
                    <div className='modal-close' onClick={closeModal}>X</div>
                <div className='modal-content'>
                    <h3 className='modal-title'>Add a New Habit</h3>
                </div>
                <div className='modal-body'>
                    {/* replace dropdown with input field so user can type whatever they want */}
                    
                    <input autoComplete="off" type='text' id='newhabit' placeholder='Enter Habit Here' />
                    <input autoComplete="off" type='number' id='targetNumber' placeholder='Enter Target' />
                    {/* <select list='habits' className='habit-picker' name='habit-choice'> */}
                        {/* { habitsList } */}
                    {/* </select> */}
                    <div className='wrapper-editHabit hidden'>
                        <div className='edit-decrement'>-</div>
                        <input type='text' className='edit-field' value='1'></input>
                        <div className='edit-increment'>+</div>
                    </div>
                </div>
                <div className='modal-footer'>
                    <div className="btn-save" onClick={addHabit}>
                        Add habit
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddHabit;