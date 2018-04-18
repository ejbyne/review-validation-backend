import expect from 'unexpected';
import SwaggerParser from 'swagger-parser';

import reducer, { getErrorMessage, getErrors } from '../reducer';
import {
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR,
  REVIEW_CREATE_PENDING,
  REVIEW_LOAD_SUCCESS,
  REVIEW_VALIDATED,
  SCHEMA_LOAD_SUCCESS
} from '../actions';
import mockSchema from './mockSchema.json';

describe('review reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      schema: null,
      validateCreate: null,
      reviews: [],
      errors: null
    };
  });

  it('should add loaded schema to state', async () => {
    const schema = await SwaggerParser.dereference(mockSchema);

    const action = {
      type: SCHEMA_LOAD_SUCCESS,
      payload: schema
    };

    const updatedState = reducer(state, action);

    expect(updatedState, 'to satisfy', {
      ...state,
      schema,
      validateCreate: expect.it('to be a', 'function')
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

  it('should add error to state', () => {
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

  it('should add review validation result to state', () => {
    const action = {
      type: REVIEW_VALIDATED,
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

    it('should convert the error to an object containing error fields', () => {
      state = {
        ...state,
        error
      };

      const selected = getErrors(state);

      expect(selected, 'to equal', {
        firstName: 'First Name is not allowed to be empty',
        date: 'Date must be a number of milliseconds or valid date string'
      });
    });
  });
});
