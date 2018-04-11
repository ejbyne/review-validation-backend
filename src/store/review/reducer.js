import { REVIEW_CREATE_SUCCESS, REVIEW_CREATE_ERROR } from './actions';

const initialState = {
  lastReview: null,
  errors: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REVIEW_CREATE_SUCCESS:
      return { ...state, lastReview: payload };
    case REVIEW_CREATE_ERROR:
      return { ...state, errors: payload.message };
    default:
      return state;
  }
};

export default reducer;
