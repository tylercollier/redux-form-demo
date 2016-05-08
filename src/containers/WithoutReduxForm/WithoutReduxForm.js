import React, {Component} from 'react';
import immutable from 'seamless-immutable';
import * as validation from './../../utils/validation';
import mapValues from 'lodash/mapValues';

export default class WithoutReduxForm extends Component {
  constructor() {
    super(arguments);
    this.state = {
      data: immutable({
        formValues: {
          firstName: {
            value: '',
            touched: false,
            errors: null
          },
          lastName: {
            value: '',
            touched: false,
            errors: null
          }
        }
      })
    };
    this.validator = validation.createValidator({
      firstName: validation.required,
      lastName: validation.required
    });
  }

  onChange(event, inputName) {
    const newState = this.state.data.setIn(['formValues', inputName], {
      value: event.target.value,
      touched: true
    });
    this.setState({data: newState}, this.validateForm);
  }

  validateForm() {
    const values = mapValues(this.state.data.formValues, value => value.value);
    const errors = this.validator(values);
    const valuesWithErrors = { formValues: mapValues(errors, (error) => { return {errors: error};}) };
    const newData = this.state.data.merge(valuesWithErrors, {deep: true});
    this.setState({data: newData});
  }

  render() {
    const { formValues: { firstName, lastName } } = this.state.data;
    return (
      <div className="container">
        <h1>Without Redux-Form</h1>

        <label htmlFor="firstName">First name</label>
        <input type="text" className="form-control" value={firstName.value} onChange={event => this.onChange(event, 'firstName')} onBlur={event => this.onChange(event, 'firstName')}/>
        {firstName.touched && firstName.errors && <div className="text-danger">{firstName.errors}</div>}
        <label htmlFor="lastName">Last name</label>
        <input type="text" className="form-control" value={lastName.value} onChange={event => this.onChange(event, 'lastName')} onBlur={event => this.onChange(event, 'lastName')}/>
        {lastName.touched && lastName.errors && <div className="text-danger">{lastName.errors}</div>}
      </div>
    );
  }
}
