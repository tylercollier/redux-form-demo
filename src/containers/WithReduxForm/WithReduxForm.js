import React, {Component, PropTypes} from 'react';
import * as validation from './../../utils/validation';
import {reduxForm} from 'redux-form';

class WithReduxForm extends Component {
  render() {
    const { fields: { firstName, lastName } } = this.props;
    return (
      <div className="container">
        <h1>With Redux-Form</h1>

        <label htmlFor="firstName">First name</label>
        <input type="text" className="form-control" {...firstName}/>
        {firstName.touched && firstName.error && <div className="text-danger">{firstName.error}</div>}
        <label htmlFor="lastName">Last name</label>
        <input type="text" className="form-control" {...lastName}/>
        {lastName.touched && lastName.error && <div className="text-danger">{lastName.error}</div>}
      </div>
    );
  }
}

WithReduxForm.propTypes = {
  fields: PropTypes.object.isRequired
};

const WithReduxFormEnhanced = reduxForm({
  form: 'withReduxForm',
  fields: ['firstName', 'lastName'],
  validate: validation.createValidator({
    firstName: validation.required,
    lastName: validation.required
  })
})(WithReduxForm);

export default WithReduxFormEnhanced;
