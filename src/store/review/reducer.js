import { createSelector } from 'reselect';
import Enjoi from 'enjoi';

import {
  REVIEW_LOAD_SUCCESS,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR,
  SCHEMA_LOAD_SUCCESS,
  REVIEW_VALIDATED
} from './actions';
import messages from '../../messages/messages.en.json';

const ERROR_REG_EX = /(?<=\[).+?(?=\])/g;
const FIELD_REG_EX = /(?<=").+?(?=")/;

const initialState = {
  schema: null,
  validateCreate: null,
  reviews: [],
  error: null,
  success: false
};

// Reducer

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SCHEMA_LOAD_SUCCESS:
      return {
        ...state,
        schema: payload,
        validateCreate: getValidator(payload, 'post')
      };
    case REVIEW_LOAD_SUCCESS:
      return { ...state, reviews: payload };
    case REVIEW_CREATE_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, payload],
        success: true,
        error: null
      };
    case REVIEW_CREATE_ERROR:
    case REVIEW_VALIDATED:
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

const getValidator = (schema, method) => {
  const postSchema = schema.paths['/reviews'][method].parameters[0].schema;
  const validator = Enjoi(postSchema);
  return command =>
    validator.validate(removeEmptyStrings(command), {
      abortEarly: false
    });
};

const removeEmptyStrings = command =>
  Object.keys(command).reduce((fields, key) => {
    fields[key] = command[key] || undefined;
    return fields;
  }, {});

const parseErrors = error => {
  const validationErrors = error.message.match(ERROR_REG_EX) || [];
  return validationErrors.reduce((errors, current) => {
    const field = current.match(FIELD_REG_EX)[0] || [];
    errors[field] = current.replace(`"${field}"`, messages[field]);
    return errors;
  }, {});
};
