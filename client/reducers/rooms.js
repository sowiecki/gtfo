// import immutable from 'immutable';

const initialState = {};

export const rooms = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ROOMS':
      return action;
    default:
      return state;
  }
};
