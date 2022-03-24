import * as types from '../constants/actionTypes';

const initialState = {
  userId: null,
  firstName: null,
  calendar: [],
  showModal: false,
  habits: []
}


const habitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FEED: {
      const { calendar, habits, userId, firstName } = action.payload;
      const copyState = JSON.parse(JSON.stringify(state));
      const newState = { ...copyState, calendar, habits, userId, firstName }
      return newState;
    }

    case types.ADD_NEWHABIT: {
      const copyState = JSON.parse(JSON.stringify(state));
      copyState.habits.push(action.payload[0]);
      return copyState;
    }

    case types.SHOW_MODAL: {
      return {
        ...state, 
        //return whatever is the opposite of initial/current showModal state
        showModal: !state.showModal
      }
    }

    case types.INCREMENT_NUM_HABIT: {

      const copyState = JSON.parse(JSON.stringify(state));
      const habitsCopy = copyState.habits;
      console.log('habitsCopy: ', habitsCopy)
      for (let i = 0; i < habitsCopy.length; i += 1) {
        if (habitsCopy[i].habit_name === action.payload) {
          habitsCopy[i].current_num += 1;
        }
      }
      console.log('STATE: ', copyState.habits)
      return copyState
    }

    case types.DELETE_HABIT: {
      const copyState = JSON.parse(JSON.stringify(state));
      const habitsCopy = copyState.habits;
      for (let i = 0; i < habitsCopy.length; i++) {
        if (habitsCopy[i].habit_name === action.payload) {
          habitsCopy.splice(i, 1);
        }
      }
      console.log('STATE: ', copyState.habits)
      return {...copyState, habitsCopy};
    }

    default: {
      return state;
    }
  }
}

export default habitsReducer;