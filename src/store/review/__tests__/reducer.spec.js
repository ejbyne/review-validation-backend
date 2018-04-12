import expect from 'unexpected';

import reducer from '../reducer';
import {
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR,
  REVIEW_CREATE_PENDING
} from '../actions';

describe('review reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      lastReview: null,
      errorMessage: null,
      errors: {}
    };
  });

  it('should reset error message when review create pending', () => {
    state = { ...state, errorMessage: 'ERRORS' };
    const action = { type: REVIEW_CREATE_PENDING };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      lastReview: null,
      errorMessage: null,
      errors: {}
    });
  });

  it('should add created review to state', () => {
    const action = {
      type: REVIEW_CREATE_SUCCESS,
      payload: { id: 1, comment: 'great' }
    };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      lastReview: { id: 1, comment: 'great' },
      errorMessage: null,
      errors: {}
    });
  });

  it('should add error message and parsed errors object to state', () => {
    const action = {
      type: REVIEW_CREATE_ERROR,
      payload: {
        error: 'Bad Request',
        message:
          'child "firstName" fails because ["firstName" is not allowed to be empty]. child "date" fails because ["date" must be a number of milliseconds or valid date string]',
        statusCode: 400,
        validation: {
          source: 'payload',
          keys: ['firstName', 'date']
        }
      }
    };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      lastReview: null,
      errorMessage:
        'child "firstName" fails because ["firstName" is not allowed to be empty]. child "date" fails because ["date" must be a number of milliseconds or valid date string]',
      errors: {
        firstName: 'First Name is not allowed to be empty',
        date: 'Date must be a number of milliseconds or valid date string'
      }
    });
  });
});
