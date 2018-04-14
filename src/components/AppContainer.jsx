import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getErrorMessage, getErrors } from '../store/review/selectors';
import { loadSchema, loadReviews, createReview } from '../store/review/actions';
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
  errors: getErrors(state)
});

const mapDispatchToProps = dispatch => ({
  loadSchema: () => dispatch(loadSchema()),
  loadReviews: () => dispatch(loadReviews()),
  createReview: review => dispatch(createReview(review))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
