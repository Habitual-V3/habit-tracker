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
	//add state prop here if you want to console.log current state
	//add showModal prop to state
	userId: state.habits.userId,
  showModal: state.habits.showModal,
  habits: state.habits.habits,
  calendar: state.habits.calendar,
});

const mapDispatchToProps = (dispatch) => ({
  incrementNumHabit: (habitId) => dispatch(actions.incrementNumHabitActionCreator(habitId)),
  decrementNumHabit: (habitId) => dispatch(actions.decrementNumHabitActionCreator(habitId)),
  completeBoolHabit: (habitId) => dispatch(actions.completeBoolHabitActionCreator(habitId)),
  uncompleteBoolHabit: (habitId) => dispatch(actions.uncompleteBoolHabitActionCreator(habitId)),
  // showModalAdd: (show) => dispatch(actions.showModalAddActionCreator(show)),
  // hideModalAdd: (show) => dispatch(actions.hideModalAddActionCreator(show)),
	showModalAction: (show) => dispatch(actions.modalActionCreator(show)),
  showModalEdit: (show) => dispatch(actions.showModalEditActionCreator(show)),
  hideModalEdit: (show) => dispatch(actions.hideModalEditActionCreator(show)),
	addNewHabit: (habit) => dispatch(actions.createHabitActionCreator(habit)), 
  deleteHabit: (habit) => dispatch(actions.deleteHabitActionCreator(habit))
});

class FeedContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
				// console.log('state: ', this.props.state)
        // console.log('calendar', this.props) 
				// console.log('showmodal: ', this.props.showModal)
				//console.log('habits in state: ', this.props.habits)

        return(
            <div>
                <AddHabit 
                // show should be a boolean on whether or not we want the modal to be displayed
                    show={this.props.showModal}
										showModalAdd={this.props.showModalAction}

										userId={this.props.userId}
                    // show={this.props.showModalAdd}
                    // hideModalAdd={this.props.hideModalAdd} 
                    habits={this.props.habits}
										addNewHabit={this.props.addNewHabit}/>
                {/* <EditHabit 
                    show={this.props.showModalEdit} 
                    habits={this.props.todayHabit}/> */}
                <TopBar 
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
