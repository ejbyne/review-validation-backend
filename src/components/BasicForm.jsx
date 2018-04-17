import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import messages from '../messages/messages.en.json';

import styles from './BasicForm.css';

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  score: '',
  comment: '',
  date: '',
  willComeAgain: true
};

class BasicForm extends Component {
  static propTypes = {
    createReview: PropTypes.func.isRequired,
    validateReview: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

  state = emptyForm;

  handleChange = name => ({ target: { value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => this.props.createReview(this.state);

  handleBlur = () => this.props.validateReview(this.state);

  render() {
    const { errors } = this.props;
    const { firstName, lastName, email, score, comment, date } = this.state;
    return (
      <form className={styles.container} noValidate autoComplete="off">
        <TextField
          error={errors.firstName !== undefined}
          label={messages.firstName}
          value={firstName}
          helperText={errors.firstName}
          onChange={this.handleChange('firstName')}
          onBlur={this.handleBlur}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={errors.lastName !== undefined}
          label={messages.lastName}
          value={lastName}
          helperText={errors.lastName}
          onChange={this.handleChange('lastName')}
          onBlur={this.handleBlur}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={errors.email !== undefined}
          label={messages.email}
          value={email}
          helperText={errors.email}
          onChange={this.handleChange('email')}
          onBlur={this.handleBlur}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={errors.score !== undefined}
          label={messages.score}
          value={score}
          helperText={errors.score}
          onChange={this.handleChange('score')}
          onBlur={this.handleBlur}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={errors.comment !== undefined}
          label={messages.comment}
          value={comment}
          helperText={errors.comment}
          multiline
          rows="4"
          onChange={this.handleChange('comment')}
          onBlur={this.handleBlur}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          error={errors.date !== undefined}
          label={messages.date}
          value={date}
          helperText={errors.date}
          onChange={this.handleChange('date')}
          onBlur={this.handleBlur}
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

export default BasicForm;
