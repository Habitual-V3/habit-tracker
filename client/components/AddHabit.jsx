import React, { useState } from 'react';
import { connect } from 'react-redux';


const AddHabit = (props) => {
            // const state = props.habits;
            // const selectedHabit = document.getElementById('habits')
            // const selectedTarget = 

            // const reqOptions = {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json'},
            //     body: JSON.stringify({
            //         userId: userId,
            //         habitName: selectedHabit,
            //         targetNum: selectedTarget,
            //     })
            // }

    //if props.show is falsey, don't show modal
    if (!props.show) {
        return null;
    }
    // use ? for optional chaining - if prop doesn't exist, don't move on to next prop
    // const activeHabits = props.habits?.habits;
    // console.log('active habits: ', activeHabits)
    // const activeHabitsArray = [];
    // for (let key in activeHabits) {
    //     activeHabitsArray.push(activeHabits[key].habitId);
    // }
    // const availableHabits = [];
    // // nullish coelescing - defaults to right hand value if left hand is null or undefined
    // // different from OR ( || ) operation because that checks for truthy/falsey
    // const allHabits = props.habits?.allHabits ?? [];
    // for (let habit of allHabits) {
    //     if (activeHabitsArray.indexOf(habit.habitId) === -1) {
    //         availableHabits.push(habit);
    //     }
    // }
    // const habitsList = []
    // for (let habit of availableHabits) {
    //     habitsList.push(
    //         // <option value={habit.habitId}>{habit.habit}</option>
    //         <option value={habit.habitId}>{habit.habit}</option>
    //     )
    // }
    function closeModal () {
        props.showModalAdd();
        console.log(props.show)
    }
    function addHabit () {
        //grab input text value
        //modal should close when user clicks submits
        //store to database
        let newHabit = document.getElementById("newhabit").value
        props.showModalAdd()

        fetch('/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            //store to habits table
            body: JSON.stringify({habit_name: newHabit, userId: props.userId}) 
            //server should insert to both habits & user_habits tables
        })
    }
    const handleSelectChange = (e) => {
        console.log('hit');
    }

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
                    <input type='text' id='newhabit' placeholder='type here' />
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