import SwaggerParser from 'swagger-parser';

export const SCHEMA_LOAD_SUCCESS = 'SCHEMA_LOAD_SUCCESS';
export const REVIEW_LOAD_SUCCESS = 'REVIEW_LOAD_SUCCESS';
export const REVIEW_CREATE_SUCCESS = 'REVIEW_CREATE_SUCCESS';
export const REVIEW_CREATE_ERROR = 'REVIEW_CREATE_ERROR';
export const REVIEW_VALIDATED = 'REVIEW_VALIDATED';

// Action creators

export const schemaLoadSuccess = payload => ({
  type: SCHEMA_LOAD_SUCCESS,
  payload
});

export const reviewLoadSuccess = payload => ({
  type: REVIEW_LOAD_SUCCESS,
  payload
});

export const reviewCreateSuccess = payload => ({
  type: REVIEW_CREATE_SUCCESS,
  payload
});

export const reviewCreateError = payload => ({
  type: REVIEW_CREATE_ERROR,
  payload
});

export const reviewValidated = payload => ({
  type: REVIEW_VALIDATED,
  payload
});

// Thunks

export const loadSchema = () => async dispatch => {
  const response = await fetch('/api/schema');
  const json = await response.json();
  const schema = await SwaggerParser.dereference(json);
  dispatch(schemaLoadSuccess(schema));
};

export const loadReviews = () => async dispatch => {
  const response = await fetch('/api/reviews');
  const json = await response.json();
  return dispatch(reviewLoadSuccess(json));
};

export const validateReview = command => async (dispatch, getState) => {
  try {
    await getState().validateCreate(command);
    dispatch(reviewValidated(null));
    return true;
  } catch (err) {
    dispatch(reviewValidated({ message: err.message }));
    return false;
  }
};

export const createReview = command => async dispatch => {
  const isValid = await dispatch(validateReview(command));
  if (isValid) {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(command)
    });
    const json = await response.json();
    if (!response.ok) {
      dispatch(reviewCreateError(json));
    } else {
      dispatch(reviewCreateSuccess(json));
    }
  }
};
