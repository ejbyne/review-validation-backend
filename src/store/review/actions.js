export const LOAD_SCHEMA_SUCCESS = 'LOAD_SCHEMA_SUCCESS';
export const REVIEW_CREATE_PENDING = 'REVIEW_CREATE_PENDING';
export const REVIEW_CREATE_SUCCESS = 'REVIEW_CREATE_SUCCESS';
export const REVIEW_CREATE_ERROR = 'REVIEW_CREATE_ERROR';

export const loadSchemaSuccess = payload => ({
  type: LOAD_SCHEMA_SUCCESS,
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
