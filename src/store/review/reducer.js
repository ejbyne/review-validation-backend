import { createSelector } from 'reselect';

import {
  REVIEW_LOAD_SUCCESS,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR
} from './actions';

const initialState = {
  reviews: [],
  error: null,
  success: false
};

// Reducer

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REVIEW_LOAD_SUCCESS:
      return { ...state, reviews: payload };
    case REVIEW_CREATE_SUCCESS:
      return { ...state, reviews: [...state.reviews, payload], success: true };
    case REVIEW_CREATE_ERROR:
      return {
        ...state,
        error: payload,
        success: false
      };
    default:
      return state;
  }
};

export default reducer;

// Selectors

const getError = state => state.error;

export const getErrorMessage = createSelector(
  [getError],
  error => (error ? JSON.stringify(error) : null)
);

export const getSuccess = state => state.success;
