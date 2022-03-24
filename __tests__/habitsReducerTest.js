import reducer from '../client/reducers/habitsReducer.js'

describe('Habits Reducer', () => {
  let state;
  let user;
  beforeEach(() => {
    state = {
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
          current_num : 1,
          completed: false,
        },
      ],
    
      calendar: [],
      // showModalAdd: false,
      // showModalEdit: false,
      showModal: false,
    }; //end of state
    
  }); //end of beforeEach function
  
  // describe('default state upon opening application', () => {
  //   it ('should return a default state')
  // })
  // describe('initial user log in state', () => {
  //   it ('should update return state update with user specific information')
  // })

  describe('unrecognized action types', () => {
    it('should return the original without duplication', () => {
      const action = { type: 'blah' };
      expect(reducer(state, action)).toBe(state);
    });
  });

  // Unit test for GET_FEED reducer
  describe('GET_FEED', () => {
    const action = {
      type: 'GET_FEED',
      payload: {
        userId: 1,
        habits: [
          {
            id: 1,
            habit_name: 'Drink water',
            target_num: 8,
            current_num: 0,
          },
          {
            id: 2,
            habit_name: 'walk dog',
            target_num: 1,
            current_num: 0,
          }
        ],
        calendar: [0.75, 1, 1, 1, 1, 1, 0.5, 1, 0.75, 0.8, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      }
    };

    //test for getting userId
    it('gets user id', () => {
      const { userId } = reducer(state, action);
      expect(userId).toBe(1);
    })

    //test for getting user habits
    it('gets user habits', () => {
      const { habits } = reducer(state, action);
      expect(habits).toEqual([
        {
          id: 1,
          habit_name: 'Drink water',
          target_num: 8,
          current_num: 0,
        },
        {
          id: 2,
          habit_name: 'walk dog',
          target_num: 1,
          current_num: 0,
        }
      ]);
    });

    // test for getting user calendar
    it('gets user calendar', () => {
      const { calendar } = reducer(state, action);
      expect(calendar).toEqual([0.75, 1, 1, 1, 1, 1, 0.5, 1, 0.75, 0.8, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]);
    })
  })

  describe('SHOW_MODAL', () => {
    const action = {
      type: 'SHOW_MODAL',
      payload: true,
    }
    const action2 = {
      type: 'SHOW_MODAL',
      payload: false,
    }

    it ('updates boolean value of show modal in state', () => {
      const newState = reducer(state, action);
      expect(newState.showModal).toEqual(true);
      const { showModal } = reducer(newState, action2);
      expect(showModal).toEqual(false);
    })
  })

  describe('INCREMENT_NUM_HABIT', () => {
    const action = {
      type: 'INCREMENT_NUM_HABIT',
      payload: 'drink water'
    }
    it ('should return new state object', () => {
      const newState = reducer(state, action);
      expect(newState).not.toBe(state);
    })

    it('should incremement habit currentNum by 1', () => {
      const newState = reducer(state, action);
      expect(newState.habits[0].current_num).toEqual(1);
    })
  })



}); //end of describe