import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

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
    onCreateReview: PropTypes.func.isRequired
  };

  state = emptyForm;

  handleChange = name => ({ target: { value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => this.props.onCreateReview(this.state);

  render() {
    const { firstName, lastName, email, score, comment, date } = this.state;
    return (
      <form className={styles.container} noValidate autoComplete="off">
        <TextField
          label="First Name"
          value={firstName}
          onChange={this.handleChange('firstName')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={this.handleChange('lastName')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          label="Email"
          value={email}
          onChange={this.handleChange('email')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          label="Score"
          value={score}
          onChange={this.handleChange('score')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          label="Comment"
          value={comment}
          multiline
          rows="4"
          onChange={this.handleChange('comment')}
          margin="normal"
          className={styles.textField}
        />
        <TextField
          label="Date"
          value={date}
          onChange={this.handleChange('date')}
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
