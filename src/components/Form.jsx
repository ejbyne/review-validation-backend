import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import messages from '../messages/messages.en.json';

import styles from './Form.css';

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  score: '',
  comment: '',
  date: '',
  willComeAgain: 'maybe'
};

class Form extends Component {
  static propTypes = {
    createReview: PropTypes.func.isRequired,
    validateReview: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.success !== prevState.success) {
      const stateUpdate = { success: nextProps.success };
      if (nextProps.success) {
        stateUpdate.data = { ...emptyForm };
        stateUpdate.edited = new Set();
      }
      return stateUpdate;
    }
    return null;
  }

  state = {
    data: emptyForm,
    edited: new Set()
  };

  getError = field => this.state.edited.has(field) && this.props.errors[field];

  hasError = field => this.props.errors[field] && this.state.edited.has(field);

  handleChange = field => ({ target: { value } }) => {
    this.setState(({ data }) => ({
      data: { ...data, [field]: value }
    }));
  };

  handleBlur = field => () => {
    this.props.validateReview(this.state.data);
    this.setState(({ edited }) => ({
      edited: new Set([...edited, field])
    }));
  };

  handleSubmit = () => {
    const { data } = this.state;
    this.props.createReview(data);
    this.setState({ edited: new Set(Object.keys(data)) });
  };

  render() {
    const {
      data: { firstName, lastName, email, score, comment, date }
    } = this.state;
    return (
      <form className={styles.container} noValidate autoComplete="off">
        <TextField
          error={this.hasError('firstName')}
          label={messages.firstName}
          value={firstName}
          helperText={this.getError('firstName')}
          onChange={this.handleChange('firstName')}
          onBlur={this.handleBlur('firstName')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={this.hasError('lastName')}
          label={messages.lastName}
          value={lastName}
          helperText={this.getError('lastName')}
          onChange={this.handleChange('lastName')}
          onBlur={this.handleBlur('lastName')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={this.hasError('email')}
          label={messages.email}
          value={email}
          helperText={this.getError('email')}
          onChange={this.handleChange('email')}
          onBlur={this.handleBlur('email')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={this.hasError('comment')}
          label={messages.comment}
          value={comment}
          helperText={this.getError('comment')}
          multiline
          rows="4"
          onChange={this.handleChange('comment')}
          onBlur={this.handleBlur('comment')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={this.hasError('score')}
          label={messages.score}
          value={score}
          helperText={this.getError('score')}
          onChange={this.handleChange('score')}
          onBlur={this.handleBlur('score')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={this.hasError('date')}
          label={messages.date}
          value={date}
          helperText={this.getError('date')}
          onChange={this.handleChange('date')}
          onBlur={this.handleBlur('date')}
          margin="normal"
          className={styles.textField}
        />
        <Button variant="raised" color="secondary" onClick={this.handleSubmit}>
          Submit Form
        </Button>
      </form>
    );
  }
}

export default Form;
