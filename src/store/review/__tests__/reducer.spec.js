import expect from 'unexpected';

import reducer from '../reducer';
import {
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR,
  REVIEW_CREATE_PENDING,
  LOAD_SCHEMA_SUCCESS,
  REVIEW_LOAD_SUCCESS
} from '../actions';

describe('review reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      schema: null,
      reviews: [],
      errorMessage: null,
      errors: {}
    };
  });

  it('should add loaded schema to state', () => {
    const action = { type: LOAD_SCHEMA_SUCCESS, payload: { schema: 'SCHEMA' } };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      ...state,
      schema: { schema: 'SCHEMA' }
    });
  });

  it('should add loaded reviews to state', () => {
    const action = {
      type: REVIEW_LOAD_SUCCESS,
      payload: [{ id: 1 }, { id: 2 }]
    };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      ...state,
      reviews: [{ id: 1 }, { id: 2 }]
    });
  });

  it('should reset error message when review create pending', () => {
    state = { ...state, errorMessage: 'ERRORS' };
    const action = { type: REVIEW_CREATE_PENDING };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      ...state,
      errorMessage: null
    });
  });

  it('should add created review to state', () => {
    const action = {
      type: REVIEW_CREATE_SUCCESS,
      payload: { id: 1, comment: 'great' }
    };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      ...state,
      reviews: [{ id: 1, comment: 'great' }]
    });
  });

  it('should add error message and parsed errors object to state', () => {
    const errorMessage = {
      error: 'Bad Request',
      statusCode: 400,
      message:
        'child "firstName" fails because ["firstName" is not allowed to be empty]. child "date" fails because ["date" must be a number of milliseconds or valid date string]'
    };

    const action = {
      type: REVIEW_CREATE_ERROR,
      payload: errorMessage
    };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      ...state,
      errorMessage: JSON.stringify(errorMessage),
      errors: {
        firstName: 'First Name is not allowed to be empty',
        date: 'Date must be a number of milliseconds or valid date string'
      }
    });
  });
});
