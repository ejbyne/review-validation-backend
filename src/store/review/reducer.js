import { createSelector } from 'reselect';

import {
  REVIEW_LOAD_SUCCESS,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR
} from './actions';
import messages from '../../messages/messages.en.json';

const ERROR_REG_EX = /(?<=\[).+?(?=\])/g;
const FIELD_REG_EX = /(?<=").+?(?=")/;

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
      return { ...state, reviews: [...state.reviews, payload], success: true, error: null };
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

export const getErrors = createSelector(
  [getError],
  error => (error ? parseErrors(error) : {})
);

export const getSuccess = state => state.success;

// Private Functions

const parseErrors = error => {
  const validationErrors = error.message.match(ERROR_REG_EX) || [];
  return validationErrors.reduce((errors, current) => {
    const field = current.match(FIELD_REG_EX)[0] || [];
    errors[field] = current.replace(`"${field}"`, messages[field]);
    return errors;
  }, {});
};
