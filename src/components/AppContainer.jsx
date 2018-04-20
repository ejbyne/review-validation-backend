import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getErrorMessage,
  getErrors,
  getSuccess
} from '../store/review/reducer';
import {
  loadSchema,
  loadReviews,
  createReview,
  validateReview
} from '../store/review/actions';
import App from './App';

class AppContainer extends Component {
  componentDidMount() {
    this.props.loadSchema();
    this.props.loadReviews();
  }

  render() {
    return <App {...this.props} />;
  }
}

const mapStateToProps = state => ({
  errorMessage: getErrorMessage(state),
  errors: getErrors(state),
  success: getSuccess(state)
});

const mapDispatchToProps = dispatch => ({
  loadSchema: () => dispatch(loadSchema()),
  loadReviews: () => dispatch(loadReviews()),
  createReview: review => dispatch(createReview(review)),
  validateReview: review => dispatch(validateReview(review))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
