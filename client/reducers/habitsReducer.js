import * as types from '../constants/actionTypes';

const initialState = {
  userId: null,
  calendar: [],
  showModal: false,
  habits: []
}


const habitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FEED: {
      const { calendar, habits, userId } = action.payload;
      const copyState = JSON.parse(JSON.stringify(state));
      const newState = { ...copyState, calendar, habits, userId }
      //console.log('below is new state');
      //console.log(newState);
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

      


    // INCOMPLETE / REDUCERS NOT BEING USED CURRENTLY 
    
    // case types.COMPLETE_BOOL_HABIT: {
    //   const habits = [];
    //   for (let i = 0; i < state.habits.length; i++) {
    //     habits.push({...state.habits[i]});
    //     if (habits[i].habitId === action.payload ) {
    //       habits[i].completed = true;
    //     }
    //   }

    //   return {
    //     ...state,
    //     habits
    //   };
    // }

    // case types.UNCOMPLETE_BOOL_HABIT: {
    //   const habits = [];
    //   for (let i = 0; i < state.habits.length; i++) {
    //     habits.push({...state.habits[i]});

    //     if (habits[i].habitId === action.payload ) {
    //       habits[i].completed = false;
    //     }
    //   }
    //   return {
    //     ...state,
    //     habits
    //   };
    // } 

    case types.SHOW_MODAL_EDIT: {
      let showModalEdit = true;
      
      return {
        ...state,
        showModalEdit
      }
    }
    case types.HIDE_MODAL_EDIT: {
      let showModalEdit = false;
      
      return {
        ...state,
        showModalEdit
      }
    }
    default: {
      return state;
    }
  }
}

export default habitsReducer;