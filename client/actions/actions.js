import * as types from '../constants/actionTypes';

export const loginUserActionCreator = userId => ({
  type: types.LOGIN_USER, //not being used
  payload: userId,
});

export const getFeedActionCreator = data => ({
  type: types.GET_FEED,
  payload: data,
});

export const logoutUserActionCreator = () => ({
  type: types.LOGOUT_USER,
});

export const createHabitActionCreator = habitId => ({
  type: types.ADD_NEWHABIT,
  payload: habitId,
});

export const deleteHabitActionCreator = habit => ({
  type: types.DELETE_HABIT,
  payload: habit,
});

export const completeBoolHabitActionCreator = habitId => ({
  type: types.COMPLETE_BOOL_HABIT,
  payload: habitId,
});

export const uncompleteBoolHabitActionCreator = habitId => ({
  type: types.UNCOMPLETE_BOOL_HABIT,
  payload: habitId,
});

export const incrementNumHabitActionCreator = habit => ({
  type: types.INCREMENT_NUM_HABIT,
  payload: habit,
});

export const decrementNumHabitActionCreator = habitId => ({
  type: types.DECREMENT_NUM_HABIT,
  payload: habitId,
});

export const modalActionCreator = show => ({
  type: types.SHOW_MODAL, 
  payload: show
})
// export const showModalAddActionCreator = show => ({
//   type: types.SHOW_MODAL_ADD,
//   payload: show,
// })
// export const hideModalAddActionCreator = show => ({
//   type: types.HIDE_MODAL_ADD,
//   payload: show,
// })
export const showModalEditActionCreator = show => ({
  type: types.SHOW_MODAL_EDIT,
  payload: show,
})
export const hideModalEditActionCreator = show => ({
  type: types.HIDE_MODAL_EDIT,
  payload: show,
})