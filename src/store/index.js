import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reviewReducer from './review/reducer';

const store = createStore(reviewReducer, applyMiddleware(thunk));

export default store;
