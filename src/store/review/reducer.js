import {
  REVIEW_LOAD_SUCCESS,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR,
  REVIEW_CREATE_PENDING,
  LOAD_SCHEMA_SUCCESS
} from './actions';
import messages from '../../messages/messages.en.json';

const errorFindRegEx = /(?<=\[).+?(?=\])/g;
const fieldFindRegEx = /(?<=").+?(?=")/;
const fieldReplaceRegex = /".+?"/g;

const initialState = {
  schema: null,
  reviews: [],
  errorMessage: null,
  errors: {}
};

const parseErrors = errorResponse => {
  const errors = errorResponse.message.match(errorFindRegEx);
  return errors.reduce((memo, error) => {
    const field = error.match(fieldFindRegEx)[0];
    return {
      ...memo,
      [field]: error.replace(fieldReplaceRegex, messages[field])
    };
  }, {});
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_SCHEMA_SUCCESS:
      return { ...state, schema: payload };
    case REVIEW_LOAD_SUCCESS:
      return { ...state, reviews: payload };
    case REVIEW_CREATE_PENDING:
      return { ...state, errorMessage: null };
    case REVIEW_CREATE_SUCCESS:
      return { ...state, reviews: [...state.reviews, payload] };
    case REVIEW_CREATE_ERROR:
      return {
        ...state,
        errorMessage: JSON.stringify(payload),
        errors: parseErrors(payload)
      };
    default:
      return state;
  }
};

export default reducer;
