import React from 'react';
import PropTypes from 'prop-types';

import BasicForm from './BasicForm';
import NotificationBar from './NotificationBar';

const App = ({ createReview, validateReview, errorMessage, errors }) => (
  <div>
    <BasicForm
      createReview={createReview}
      validateReview={validateReview}
      errors={errors}
    />
    {errorMessage && <NotificationBar errorMessage={errorMessage} />}
  </div>
);

App.propTypes = {
  createReview: PropTypes.func.isRequired,
  validateReview: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  errors: PropTypes.object
};

export default App;
