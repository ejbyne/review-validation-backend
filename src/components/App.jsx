import React from 'react';
import PropTypes from 'prop-types';

import BasicForm from './BasicForm';
import NotificationBar from './NotificationBar';

const App = ({ onCreateReview, errorMessage }) => (
  <div>
    <BasicForm onCreateReview={onCreateReview} />
    {errorMessage && <NotificationBar errorMessage={errorMessage} />}
  </div>
);

App.propTypes = {
  onCreateReview: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default App;
