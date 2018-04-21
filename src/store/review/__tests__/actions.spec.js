import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  SCHEMA_LOAD_SUCCESS,
  REVIEW_LOAD_SUCCESS,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR,
  schemaLoadSuccess,
  reviewLoadSuccess,
  reviewCreateSuccess,
  reviewCreateError,
  loadReviews,
  createReview
} from '../actions';

const expect = unexpected.clone().use(unexpectedSinon);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('review action creators', () => {
  let store;
  let validateCreate;

  beforeEach(async () => {
    validateCreate = sinon.stub().resolves(null);
    store = mockStore({ validateCreate });

    fetchMock.reset();
    fetchMock.restore();

    fetchMock.get('/api/reviews', {
      status: 200,
      body: JSON.stringify([{ id: 1 }, { id: 2 }])
    });
    fetchMock.post('/api/reviews', {
      status: 201,
      body: JSON.stringify({ id: 1, comment: 'great' })
    });
  });

  describe('schemaLoadSuccess', () => {
    it('should dispatch LOAD SCHEMA SUCCESS action', () => {
      const action = schemaLoadSuccess({ schema: 'SCHEMA' });

      expect(action, 'to equal', {
        type: SCHEMA_LOAD_SUCCESS,
        payload: { schema: 'SCHEMA' }
      });
    });
  });

  describe('reviewLoadSuccess', () => {
    it('should dispatch REVIEW LOAD SUCCESS action', () => {
      const action = reviewLoadSuccess([{ id: 1 }, { id: 2 }]);

      expect(action, 'to equal', {
        type: REVIEW_LOAD_SUCCESS,
        payload: [{ id: 1 }, { id: 2 }]
      });
    });
  });

  describe('reviewCreateSuccess', () => {
    it('should dispatch REVIEW CREATE SUCCESS action', () => {
      const action = reviewCreateSuccess({ id: 1, comment: 'great' });

      expect(action, 'to equal', {
        type: REVIEW_CREATE_SUCCESS,
        payload: { id: 1, comment: 'great' }
      });
    });
  });

  describe('reviewCreateError', () => {
    it('should dispatch REVIEW CREATE ERROR action', () => {
      const action = reviewCreateError({ message: 'bad request' });

      expect(action, 'to equal', {
        type: REVIEW_CREATE_ERROR,
        payload: { message: 'bad request' }
      });
    });
  });

  describe('loadReviews', () => {
    it('should send a get request to the backend', () => {
      store.dispatch(loadReviews());

      expect(fetchMock.lastCall(), 'to equal', ['/api/reviews', undefined]);
    });

    it('should dispatch REVIEW LOAD SUCCESS when get request is successful', async () => {
      await store.dispatch(loadReviews());

      expect(store.getActions(), 'to equal', [
        {
          type: REVIEW_LOAD_SUCCESS,
          payload: [{ id: 1 }, { id: 2 }]
        }
      ]);
    });
  });

  describe('createReview', () => {
    it('should send a post request to the backend', async () => {
      await store.dispatch(createReview({ comment: 'great' }));

      expect(fetchMock.lastCall(), 'to equal', [
        '/api/reviews',
        {
          method: 'POST',
          body: JSON.stringify({ comment: 'great' })
        }
      ]);
    });

    it('should dispatch REVIEW CREATE SUCCESS ACTION when post is successful', async () => {
      await store.dispatch(createReview({ comment: 'great' }));

      expect(store.getActions(), 'to equal', [
        {
          type: REVIEW_CREATE_SUCCESS,
          payload: { id: 1, comment: 'great' }
        }
      ]);
    });

    it('should dispatch REVIEW CREATE ERROR when post is unsuccessful', async () => {
      fetchMock.restore();
      fetchMock.postOnce('/api/reviews', {
        status: 404,
        body: JSON.stringify({ message: 'bad request' })
      });

      await store.dispatch(createReview({ comment: 'invalid' }));

      expect(store.getActions(), 'to equal', [
        {
          type: REVIEW_CREATE_ERROR,
          payload: { message: 'bad request' }
        }
      ]);
    });
  });
});
