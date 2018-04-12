import {
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR,
  REVIEW_CREATE_PENDING
} from './actions';

const initialState = {
  lastReview: null,
  errorMessage: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REVIEW_CREATE_PENDING:
      return { ...state, errorMessage: null };
    case REVIEW_CREATE_SUCCESS:
      return { ...state, lastReview: payload };
    case REVIEW_CREATE_ERROR:
      return { ...state, errorMessage: payload.message };
    default:
      return state;
  }
};

export default reducer;
