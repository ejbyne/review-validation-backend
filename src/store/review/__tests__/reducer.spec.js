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
      errorMessage: null
    };
  });

  it('should reset errors when review create pending', () => {
    state = { ...state, errorMessage: 'ERRORS' };
    const action = { type: REVIEW_CREATE_PENDING };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      lastReview: null,
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
      lastReview: { id: 1, comment: 'great' },
      errorMessage: null
    });
  });

  it('should add create errors to state', () => {
    const action = {
      type: REVIEW_CREATE_ERROR,
      payload: { message: 'bad request' }
    };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      lastReview: null,
      errorMessage: 'bad request'
    });
  });
});
