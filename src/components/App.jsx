import React from 'react';
import PropTypes from 'prop-types';

import Form from './Form';
import NotificationBar from './NotificationBar';

import styles from './App.css';

const App = ({ createReview, validateReview, errorMessage, success }) => (
  <div className={styles.root}>
    <Form
      createReview={createReview}
      validateReview={validateReview}
      success={success}
    />
    {errorMessage && <NotificationBar errorMessage={errorMessage} />}
  </div>
);

App.propTypes = {
  createReview: PropTypes.func.isRequired,
  validateReview: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default App;
