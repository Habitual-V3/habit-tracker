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
    }; //end of state
    user = {
      userId: 1,
      habits: [
        {
          id: 1,
          habitName: 'drink water',
          targetNum: 8,
          //currentNum: 0,
        },
        {
          id: 2,
          habitName: 'walk dog',
          targetNum: 1,
          //currentNum: 0,
        }
      ],
      calendar: [0.75, 1, 1, 1, 1, 1, 0.5, 1, 0.75, 0.8, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    }
    // end of fake user
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
            habitName: 'drink water',
            targetNum: 8,
            //currentNum: 0,
          },
          {
            id: 2,
            habitName: 'walk dog',
            targetNum: 1,
            //currentNum: 0,
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
          habitName: 'drink water',
          targetNum: 8,
        },
        {
          id: 2,
          habitName: 'walk dog',
          targetNum: 1,
          // currentNum: 0,
        }
      ]);
    });

    // test for getting user calendar
    it('gets user calendar', () => {
      const { calendar } = reducer(state, action);
      expect(calendar).toEqual([0.75, 1, 1, 1, 1, 1, 0.5, 1, 0.75, 0.8, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]);
    })
  })

  // describe('INCREMENT_NUM_HABIT', () => {
  //   it ('should return state with selected habits current num property incremented by 1')
  // })



}); //end of describe