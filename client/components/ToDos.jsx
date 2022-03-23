import React from 'react';
import { connect } from 'react-redux';
import ToDoNumber from '../components/ToDoNumber.jsx';
import ToDoBoolean from '../components/ToDoBoolean.jsx';

const ToDos = (props) => {
    console.log("below is props");
    console.log("todo is ",props);
    const habits = props.habits;
    console.log('habits in ToDos: ', habits)
    const todoList = [];

    for (let habit of habits) {
        console.log('here is the habit: ', habit);
        //example habit array [{habit_name: 'stretch', id: 1, target_num: 3}]
        //if target num > 1 and not null
        if (habit[2] !== 1 && habit[2] !== null) {
            todoList.push(<ToDoNumber show={props.show} incrementNum={props.incrementNum} decrementNum={props.decrementNum} habit={habit} />)
        } else todoList.push(<ToDoBoolean show={props.show} completeBool={props.completeBool} habit={habit} />)
    }
    
    return (
        <div className='wrapper-todo'>
            {todoList} 
        </div>
    );
};

export default ToDos;

{/* <div className='item-todo'>
                <div className='habit-name'>
                    Drink water
                </div>
                <div className='progress-container'>
                    <div className='wrapper-progressbar'>
                        <div className='progressbar' style={{width: "60%"}}></div>
                    </div>
                    <div className='wrapper-btns'>
                        <div className='btn-progress minus'>-</div>
                        <div className='btn-progress plus'>+</div>
                    </div>
                </div>
            </div>
            <div className='item-todo'>
                <div className='habit-name'>
                    Walk dog
                </div>
                <div className='progress-container'>
                    <div className='wrapper-progressbar'>
                        <div className='progressbar' style={{width: "20%"}}></div>
                    </div>
                    <div className='wrapper-btns'>
                        <div className='btn-progress minus'>-</div>
                        <div className='btn-progress plus'>+</div>
                    </div>
                </div>
            </div>
            <div className='item-todo'>
                <div className='habit-name'>
                    Sleep on time
                </div>
                <div className='progress-container'>
                    <div className='wrapper-progressbar'>
                        <div className='progressbar' style={{width: "0%"}}></div>
                    </div>
                    <div className='wrapper-btns'>
                        <div className='btn-check'>	&#10003;</div>
                    </div>
                </div>
            </div> */}