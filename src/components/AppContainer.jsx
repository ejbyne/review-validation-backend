import { connect } from 'react-redux';

import { getErrorMessage } from '../store/review/selectors';
import { createReview } from '../store/review/actions';
import App from './App';

const mapStateToProps = state => ({
  errorMessage: getErrorMessage(state)
});

const mapDispatchToProps = dispatch => ({
  onCreateReview: review => dispatch(createReview(review))
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
