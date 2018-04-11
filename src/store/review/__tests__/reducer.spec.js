import reducer from '../reducer';
import { REVIEW_CREATE_SUCCESS, REVIEW_CREATE_ERROR } from '../actions';

describe('review reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      lastReview: null,
      errors: null
    };
  });

  it('should add created review to state', () => {
    const action = {
      type: REVIEW_CREATE_SUCCESS,
      payload: { id: 1, comment: 'great' }
    };

    const updatedState = reducer(state, action);

    expect(updatedState).toEqual({
      lastReview: { id: 1, comment: 'great' },
      errors: null
    });
  });

  it('should add create errors to state', () => {
    const action = {
      type: REVIEW_CREATE_ERROR,
      payload: { message: 'bad request' }
    };

    const updatedState = reducer(state, action);

    expect(updatedState).toEqual({
      lastReview: null,
      errors: 'bad request'
    });
  });
});
