import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import TopBar from '../components/TopBar.jsx';
import Calendar from '../components/Calendar.jsx';
import ToDos from '../components/ToDos.jsx';
// import Completed from '../components/Completed.jsx';
// import AddHabit from '../components/AddHabit.jsx';
// import EditHabit from '../components/EditHabit.jsx';

// TODO: add calendar
const mapStateToProps = (state) => ({
  todayHabit: state.habits.todayHabit,
  calendar: state.habits.calendar,
});

const mapDispatchToProps = (dispatch) => ({
  incrementNumHabit: (habitId) => dispatch(actions.incrementNumHabitActionCreator(habitId)),
  decrementNumHabit: (habitId) => dispatch(actions.decrementNumHabitActionCreator(habitId)),
  completeBoolHabit: (habitId) => dispatch(actions.completeBoolHabitActionCreator(habitId)),
  uncompleteBoolHabit: (habitId) => dispatch(actions.uncompleteBoolHabitActionCreator(habitId)),
  showModalAdd: (show) => dispatch(actions.showModalAddActionCreator(show)),
  hideModalAdd: (show) => dispatch(actions.hideModalAddActionCreator(show)),
  showModalEdit: (show) => dispatch(actions.showModalEditActionCreator(show)),
  hideModalEdit: (show) => dispatch(actions.hideModalEditActionCreator(show)),
});

class FeedContainer extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        console.log('calendar', this.props) 
        return(
            <div>
                {/* <AddHabit 
                    show={this.props.showModalAdd}
                    hideModalAdd={this.props.hideModalAdd} 
                    habits={this.props.habits}/> */}
                {/* <EditHabit 
                    show={this.props.showModalEdit} 
                    habits={this.props.todayHabit}/> */}
                <TopBar 
                    showModalAdd={this.props.showModalAdd}/>
                <Calendar 
                    calendarData={this.props.calendar}/>
                <ToDos 
                    show={this.props.showModalEdit} 
                    completeBool={this.props.completeBoolHabit} 
                    incrementNum={this.props.incrementNumHabit} 
                    decrementNum={this.props.decrementNumHabit} 
                    todayHabit={this.props.todayHabit}/>
                {/* <Completed 
                    show={this.props.showModalEdit} 
                    uncompleteBool={this.props.uncompleteBoolHabit} 
                    decrementNum={this.props.decrementNumHabit} 
                    todayHabit={this.props.todayHabit}/> */}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
