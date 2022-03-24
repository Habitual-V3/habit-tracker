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
        if (habit.target_num !== 1 && habit.target_num !== null) {
            todoList.push(<ToDoNumber deleteHabit={props.deleteHabit} userId={props.userId} show={props.show} incrementNum={props.incrementNum} decrementNum={props.decrementNum} habit={habit} />)
        } else todoList.push(<ToDoBoolean deleteHabit={props.deleteHabit} userId={props.userId} show={props.show} incrementNum={props.incrementNum} habit={habit} />)
    }
    
    return (
        <div className='wrapper-todo'>
            {todoList} 
        </div>
    );
};

export default ToDos;