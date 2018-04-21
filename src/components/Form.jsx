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
  date: ''
};

class Form extends Component {
  static propTypes = {
    createReview: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.success !== prevState.success) {
      const stateUpdate = { success: nextProps.success };
      if (nextProps.success) {
        stateUpdate.data = { ...emptyForm };
      }
      return stateUpdate;
    }
    return null;
  }

  state = {
    data: emptyForm
  };

  hasError = field => this.props.errors[field] !== undefined;

  handleChange = field => ({ target: { value } }) => {
    this.setState(({ data }) => ({
      data: { ...data, [field]: value }
    }));
  };

  handleSubmit = () => {
    const { data } = this.state;
    this.props.createReview(data);
  };

  render() {
    const { errors } = this.props;
    const {
      data: { firstName, lastName, email, score, comment, date }
    } = this.state;
    return (
      <form className={styles.container} noValidate autoComplete="off">
        <TextField
          error={this.hasError('firstName')}
          label={messages.firstName}
          value={firstName}
          helperText={errors.firstName}
          onChange={this.handleChange('firstName')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={this.hasError('lastName')}
          label={messages.lastName}
          value={lastName}
          helperText={errors.lastName}
          onChange={this.handleChange('lastName')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={this.hasError('email')}
          label={messages.email}
          value={email}
          helperText={errors.email}
          onChange={this.handleChange('email')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={this.hasError('comment')}
          label={messages.comment}
          value={comment}
          helperText={errors.comment}
          multiline
          rows="6"
          onChange={this.handleChange('comment')}
          margin="normal"
          className={styles.comment}
        />
        <TextField
          error={this.hasError('score')}
          label={messages.score}
          value={score}
          helperText={errors.score}
          onChange={this.handleChange('score')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={this.hasError('date')}
          label={messages.date}
          value={date}
          helperText={errors.date}
          onChange={this.handleChange('date')}
          margin="normal"
          className={styles.textField}
        />
        <Button
          variant="raised"
          color="secondary"
          onClick={this.handleSubmit}
          className={styles.button}
        >
          Submit Form
        </Button>
      </form>
    );
  }
}

export default Form;
