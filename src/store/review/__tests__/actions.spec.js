import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR,
  reviewCreateSuccess,
  reviewCreateError,
  createReview
} from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('review action creators', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});

    fetchMock.reset();
    fetchMock.restore();

    fetchMock.postOnce('/api/reviews', {
      status: 201,
      body: JSON.stringify({ id: 1, comment: 'great' })
    });
  });

  describe('reviewCreateSuccess', () => {
    it('should dispatch REVIEW CREATE SUCCESS action', () => {
      const action = reviewCreateSuccess({ id: 1, comment: 'great' });

      expect(action).toEqual({
        type: REVIEW_CREATE_SUCCESS,
        payload: { id: 1, comment: 'great' }
      });
    });
  });

  describe('reviewCreateError', () => {
    it('should dispatch REVIEW CREATE ERROR action', () => {
      const action = reviewCreateError(new Error('create error'));

      expect(action).toEqual({
        type: REVIEW_CREATE_ERROR,
        payload: new Error('create error')
      });
    });
  });

  describe('createReview', () => {
    it('should send a post request to the backend', () => {
      store.dispatch(createReview({ comment: 'great' }));

      expect(fetchMock.lastCall()).toEqual([
        '/api/reviews',
        {
          method: 'POST',
          body: JSON.stringify({ comment: 'great' })
        }
      ]);
    });

    it('should dispatch REVIEW CREATE SUCCESS ACTION when post is successful', async () => {
      await store.dispatch(createReview({ comment: 'great' }));

      expect(store.getActions()).toEqual([
        {
          type: REVIEW_CREATE_SUCCESS,
          payload: { id: 1, comment: 'great' }
        }
      ]);
    });

    it('should dispatch REVIEW CREATE ERROR ACTION when post is unsuccessful', async () => {
      fetchMock.restore();
      fetchMock.postOnce('/api/reviews', {
        status: 404,
        body: JSON.stringify({ message: 'bad request' })
      });

      await store.dispatch(createReview({ comment: 'invalid' }));

      expect(store.getActions()).toEqual([
        {
          type: REVIEW_CREATE_ERROR,
          payload: { message: 'bad request' }
        }
      ]);
    });
  });
});
