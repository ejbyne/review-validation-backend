import React from 'react';
import PropTypes from 'prop-types';

import BasicForm from './BasicForm';
import NotificationBar from './NotificationBar';

const App = ({ onCreateReview, errorMessage, errors }) => (
  <div>
    <BasicForm onCreateReview={onCreateReview} errors={errors} />
    {errorMessage && <NotificationBar errorMessage={errorMessage} />}
  </div>
);

App.propTypes = {
  onCreateReview: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  errors: PropTypes.object
};

export default App;
