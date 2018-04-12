import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

class NotificationBar extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired
  };

  state = {
    open: true
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { errorMessage } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={this.state.open}
        onClose={this.handleClose}
        message={errorMessage}
      />
    );
  }
}

export default NotificationBar;
