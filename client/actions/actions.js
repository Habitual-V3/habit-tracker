import * as types from '../constants/actionTypes';

export const loginUserActionCreator = userId => ({
  type: types.LOGIN_USER,
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

export const incrementNumHabitActionCreator = habit => ({
  type: types.INCREMENT_NUM_HABIT,
  payload: habit,
});


export const modalActionCreator = show => ({
  type: types.SHOW_MODAL, 
  payload: show
})