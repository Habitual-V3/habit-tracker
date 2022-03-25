import React from 'react';

const ToDoBoolean = (props) => {
    const habit = props.habit;
    const habitName = habit.habit_name
    const targetNum = habit.target_num
    let currentNum = habit.current_num;

    function complete() {
        if (habit.current_num === habit.target_num) return alert('target num has already been reached you\'re gonna drown or pull a muscle or sleep too early or hurt your dog.')
        
        currentNum = habit.current_num

        fetch('http://localhost:3000/edithabit/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({userId: props.userId, habitName: habitName, currentNum: currentNum + 1, targetNum: targetNum}) 
        })
        .then(data => data.json())
        .then(data => {
            // console.log('--------------habitName: ', data.habitName)
            props.updateDailyAverage(data.dailyAverage);
            props.incrementNum(habitName) ;

        })       
    }

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
    (currentNum === 1) ? status = 'Completed': status = 'Incomplete';
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
                    <div className='btn-check' onClick={complete}>	&#10003;</div>
                    <div className='btn-progress minus' onClick={deleteHabitFunc}>Delete</div>

                </div>
            </div>
        </div>
    );
};

export default ToDoBoolean;