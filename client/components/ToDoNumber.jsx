import React from 'react';

const ToDoNumber = (props) => {
    // console.log("Todonumber", props);
    const habit = props.habit;
    //console.log('habit passed down: ', habit)
    const habitName = habit.habit_name
    //console.log('habit name: ', habitName)
    let currentNum = habit.current_num;
    const targetNum = habit.target_num
    // console.log('habit name: ', habit_name)
    // const percentage = habit[3];

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
            console.log('--------------habitName: ', data.habitName)
            // props.incrementNum(data.habitName)
            // also invoke calendar reducer for currentday/last element of calendar
            
        })
        
        // if (habit.status < habit.goal) {
        //     props.incrementNum(habit[0]);
        //     //add PUT req to backend
        // }
    }
    function decrement() {
        if (habit.status > 0) {
            props.decrementNum(habit[0]);
            // add PUT req to backend
        }
    }
    const editHabit = () => {
        props.show();
    }
    let percentage = Math.floor((habit.current_num / habit.target_num) * 100)
    return (
        <div className='item-todo'>
            <div className='wrapper-habit-text'>
                <div className='habit-name habit-text'>{habitName}</div>
                {/* <div className='habit-status habit-text'>{`${habit.status} / ${habit.goal}`}</div> */}
            </div>
            <div className='progress-container'>
                <div className='wrapper-progressbar' onClick={()=>{}}>
                    <div className='progressbar' style={{width: `${percentage}%`}}></div>
                </div>
                <div className='wrapper-btns'>
                    {/* <div className='btn-progress minus' onClick={decrement}>-</div> */}
                    <div className='btn-progress plus' onClick={increment}>+</div>
                </div>
            </div>
        </div>
    );
};

export default ToDoNumber;
