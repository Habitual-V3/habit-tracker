import React from 'react';

const ToDoNumber = (props) => {
    const habit = props.habit;
    const habitName = habit.habit_name
    let currentNum = habit.current_num;
    const targetNum = habit.target_num

    function increment() {
        if (habit.current_num === habit.target_num) return alert('target num has already been reached you\'re gonna drown or pull a muscle or sleep too early or hurt your dog.')
        props.incrementNum(habitName)
        currentNum = habit.current_num

        fetch('http://localhost:3000/edithabit/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({userId: props.userId, habitName: habitName, currentNum: currentNum, targetNum: targetNum}) 
        })
        .then(data => data.json())
        .then(data => {
            console.log(data)
        })
    };

    function deleteHabitFunc() {
        props.deleteHabit(habitName);

        fetch('http://localhost:3000/edithabit/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({userId: props.userId, habitName: habitName}) 
        })
        .then(data => data.json())
        .then(response => {
            console.log('res status: ', response.status)
            if (response.status === 200) {
                console.log('habit name here here: ', habitName)
            }
        })
    }
        
     
    let status;
    let percentage = Math.floor((habit.current_num / habit.target_num) * 100);
    (currentNum === targetNum) ? status = 'Completed' : status = 'Incomplete';
    return (
        <div className='item-todo'>
            <div className='wrapper-habit-text'>
                <div className='habit-name habit-text'>{habitName}</div>
                <div className='habit-status habit-text'>{status}</div>
            </div>
            <div className='progress-container'>
                <div className='wrapper-progressbar' onClick={()=>{}}>
                    <div className='progressbar' style={{width: `${percentage}%`}}></div>
                </div>
                <div className='wrapper-btns'>
                    <div className='btn-progress plus' onClick={increment}>+</div>
                    <div className='btn-progress minus' onClick={deleteHabitFunc}>Delete</div>
                    
                </div>
            </div>
        </div>
    );
};

export default ToDoNumber;
