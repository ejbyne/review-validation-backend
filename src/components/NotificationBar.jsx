import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

class NotificationBar extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errorMessage !== prevState.errorMessage) {
      const stateUpdate = { errorMessage: nextProps.errorMessage };
      if (nextProps.errorMessage) {
        stateUpdate.open = true;
      }
      return stateUpdate;
    }
    return null;
  }

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
