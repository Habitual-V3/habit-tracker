import * as types from '../constants/actionTypes';

const initialState = {
  userId: null,
  //username:
  //calendar:
  //todaysHabits: []

  habits: [
    {
      habit: 'Drink water',
      habitId: 1,
      type: 'number',
      status: 1,
      goal: 10,
      completed: false,
    },
  ],

  calendar: [],
  // showModalAdd: false,
  // showModalEdit: false,
  showModal: false,
  allHabits: [
    {
      habit: "Drink water",
      habitId: 1,
      isBoolean: false
    },
    {
      habit: "Make bed",
      habitId: 2,
      isBoolean: true
    },
    {
      habit: "Walk dog",
      habitId: 3,
      isBoolean: false
    },
    {
      habit: "Sleep on time",
      habitId: 4,
      isBoolean: true
    },
    {
      habit: "Stretch",
      habitId: 5,
      isBoolean: false
    },
  ]
}


const habitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER: {
      
    }

    case types.GET_FEED: {
      const { calendar, todayHabit, userId } = action.payload;
      const copyState = JSON.parse(JSON.stringify(state));
      const newState = { ...copyState, calendar, todayHabit, userId }
      console.log('below is new state');
      console.log(newState);
      return newState;
    }

    case types.COMPLETE_BOOL_HABIT: {
      const habits = [];
      for (let i = 0; i < state.habits.length; i++) {
        habits.push({...state.habits[i]});
        if (habits[i].habitId === action.payload ) {
          habits[i].completed = true;
        }
      }

      return {
        ...state,
        habits
      };
    }

    case types.UNCOMPLETE_BOOL_HABIT: {
      const habits = [];
      for (let i = 0; i < state.habits.length; i++) {
        habits.push({...state.habits[i]});

        if (habits[i].habitId === action.payload ) {
          habits[i].completed = false;
        }
      }
      return {
        ...state,
        habits
      };
    }

    case types.INCREMENT_NUM_HABIT: {
      const habits = [];
      for (let i = 0; i < state.habits.length; i++) {
        habits.push({...state.habits[i]});

        // increment the status for the target habit, if this completes habit change to completed
        if (habits[i].habitId === action.payload ) {
          habits[i].status++;
          if (habits[i].status === habits[i].goal) habits[i].completed = true;
        }
      }

      return {
        ...state,
        habits
      };
    }

    case types.DECREMENT_NUM_HABIT: {
      const habits = [];
      for (let i = 0; i < state.habits.length; i++) {
        habits.push({...state.habits[i]});

        if (habits[i].habitId === action.payload ) {
          if (habits[i].completed === true) habits[i].completed = false;
          if (habits[i].status > 0) habits[i].status--;
        }
      }
        return {
          ...state,
          habits,
        };
      }
      
    // case types.SHOW_MODAL_ADD: {
    //   let showModalAdd = true;

    //   return {
    //     ...state,
    //     showModalAdd
    //   }
    // }
    // case types.HIDE_MODAL_ADD: {
    //   let showModalAdd = false;
      
    //   return {
    //     ...state,
    //     showModalAdd
    //   }
    // }

    case types.SHOW_MODAL: {
      return {
        ...state, 
        //return whatever is the opposite of initial/current showModal state
        showModal: !state.showModal
      }
    }

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