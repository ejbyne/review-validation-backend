import React from 'react';
import PropTypes from 'prop-types';

import Form from './Form';

import styles from './App.css';

const App = ({ createReview, validateReview, errors, success }) => (
  <div className={styles.root}>
    <Form
      createReview={createReview}
      validateReview={validateReview}
      errors={errors}
      success={success}
    />
  </div>
);

App.propTypes = {
  createReview: PropTypes.func.isRequired,
  validateReview: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default App;
