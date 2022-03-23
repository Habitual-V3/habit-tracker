import React from 'react';

const ToDoNumber = (props) => {
    console.log("Todonumber", props);
    const habit = props.habit;
    console.log('habit passed down: ', habit)
    const habit_name = habit.habit_name
    // console.log('habit name: ', habit_name)
    const percentage = habit[3];

    function increment() {
        if (habit.status < habit.goal) {
            props.incrementNum(habit[0]);
            //add PUT req to backend
        }
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
    return (
        <div className='item-todo'>
            <div className='wrapper-habit-text'>
                <div className='habit-name habit-text'>{habit_name}</div>
                {/* <div className='habit-status habit-text'>{`${habit.status} / ${habit.goal}`}</div> */}
            </div>
            <div className='progress-container'>
                <div className='wrapper-progressbar' onClick={()=>{}}>
                    <div className='progressbar' style={{width: `${percentage}%`}}></div>
                </div>
                <div className='wrapper-btns'>
                    <div className='btn-progress minus' onClick={decrement}>-</div>
                    <div className='btn-progress plus' onClick={increment}>+</div>
                </div>
            </div>
        </div>
    );
};

export default ToDoNumber;
