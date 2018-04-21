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
    createReview: PropTypes.func.isRequired
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
    const {
      data: { firstName, lastName, email, score, comment, date }
    } = this.state;
    return (
      <form className={styles.container} noValidate autoComplete="off">
        <TextField
          label={messages.firstName}
          value={firstName}
          onChange={this.handleChange('firstName')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          label={messages.lastName}
          value={lastName}
          onChange={this.handleChange('lastName')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          label={messages.email}
          value={email}
          onChange={this.handleChange('email')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          label={messages.comment}
          value={comment}
          multiline
          rows="6"
          onChange={this.handleChange('comment')}
          margin="normal"
          className={styles.comment}
        />
        <TextField
          label={messages.score}
          value={score}
          onChange={this.handleChange('score')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          label={messages.date}
          value={date}
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
