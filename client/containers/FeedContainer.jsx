import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import TopBar from '../components/TopBar.jsx';
import Calendar from '../components/Calendar.jsx';
import ToDos from '../components/ToDos.jsx';
// import Completed from '../components/Completed.jsx';
import AddHabit from '../components/AddHabit.jsx';
// import EditHabit from '../components/EditHabit.jsx';

// TODO: add calendar
const mapStateToProps = (state) => ({
	userId: state.habits.userId,
  showModal: state.habits.showModal,
  habits: state.habits.habits,
  calendar: state.habits.calendar,
  firstName: state.habits.firstName
});

const mapDispatchToProps = (dispatch) => ({
  incrementNumHabit: (habitId) => dispatch(actions.incrementNumHabitActionCreator(habitId)),
	showModalAction: (show) => dispatch(actions.modalActionCreator(show)),
	addNewHabit: (habit) => dispatch(actions.createHabitActionCreator(habit)), 
  deleteHabit: (habit) => dispatch(actions.deleteHabitActionCreator(habit))
});

class FeedContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return(
            <div>
                <AddHabit 
                    show={this.props.showModal}
										showModalAdd={this.props.showModalAction}

										userId={this.props.userId} 
                    habits={this.props.habits}
										addNewHabit={this.props.addNewHabit}/>
                <TopBar 
                    firstName={this.props.firstName}
                    showModalAction={this.props.showModalAction}/>
                <Calendar 
                    calendarData={this.props.calendar}/>
                <ToDos 
										userId={this.props.userId}
								    show={this.props.showModal}
										showModalAdd={this.props.showModalAction}
                    // show={this.props.showModalEdit} 
                    completeBool={this.props.completeBoolHabit} 
                    incrementNum={this.props.incrementNumHabit} 
                    decrementNum={this.props.decrementNumHabit} 
                    habits={this.props.habits}
                    deleteHabit={this.props.deleteHabit}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
