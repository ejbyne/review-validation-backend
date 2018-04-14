export const SCHEMA_LOAD_SUCCESS = 'SCHEMA_LOAD_SUCCESS';
export const REVIEW_LOAD_SUCCESS = 'REVIEW_LOAD_SUCCESS';
export const REVIEW_CREATE_PENDING = 'REVIEW_CREATE_PENDING';
export const REVIEW_CREATE_SUCCESS = 'REVIEW_CREATE_SUCCESS';
export const REVIEW_CREATE_ERROR = 'REVIEW_CREATE_ERROR';
export const REVIEW_VALIDATE = 'REVIEW_VALIDATE';

export const schemaLoadSuccess = payload => ({
  type: SCHEMA_LOAD_SUCCESS,
  payload
});

export const reviewLoadSuccess = payload => ({
  type: REVIEW_LOAD_SUCCESS,
  payload
});

export const reviewCreatePending = () => ({
  type: REVIEW_CREATE_PENDING
});

export const reviewCreateSuccess = payload => ({
  type: REVIEW_CREATE_SUCCESS,
  payload
});

export const reviewCreateError = payload => ({
  type: REVIEW_CREATE_ERROR,
  payload
});

export const reviewValidate = payload => ({
  type: REVIEW_VALIDATE,
  payload
});

export const loadSchema = () => async dispatch => {
  const response = await fetch('/api/schema');
  const json = await response.json();
  return dispatch(schemaLoadSuccess(json));
};

export const loadReviews = () => async dispatch => {
  const response = await fetch('/api/reviews');
  const json = await response.json();
  return dispatch(reviewLoadSuccess(json));
};

export const createReview = command => async dispatch => {
  dispatch(reviewCreatePending());
  const response = await fetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(command)
  });
  const json = await response.json();
  if (!response.ok) {
    return dispatch(reviewCreateError(json));
  }
  return dispatch(reviewCreateSuccess(json));
};
