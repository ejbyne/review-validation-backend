import expect from 'unexpected';

import reducer, { getErrorMessage } from '../reducer';
import {
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR,
  REVIEW_LOAD_SUCCESS
} from '../actions';

describe('review reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      reviews: [],
      error: null,
      success: false
    };
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

  it('should add created review to state and set success to true', () => {
    const action = {
      type: REVIEW_CREATE_SUCCESS,
      payload: { id: 1, comment: 'great' }
    };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      ...state,
      reviews: [{ id: 1, comment: 'great' }],
      success: true
    });
  });

  it('should add error to state and set success to false', () => {
    const action = {
      type: REVIEW_CREATE_ERROR,
      payload: { message: 'ERROR' }
    };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to equal', {
      ...state,
      error: { message: 'ERROR' }
    });
  });

  describe('review selectors', () => {
    let error;

    beforeEach(() => {
      error = {
        error: 'Bad Request',
        statusCode: 400,
        message:
          'child "firstName" fails because ["firstName" is not allowed to be empty]. child "date" fails because ["date" must be a number of milliseconds or valid date string]'
      };
    });

    it('should convert the error to a string', () => {
      state = { ...state, error };

      const selected = getErrorMessage(state);

      expect(selected, 'to equal', JSON.stringify(error));
    });
  });
});
