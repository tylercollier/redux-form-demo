import React, {Component} from 'react';
import immutable from 'seamless-immutable';

export default class WithoutReduxForm extends Component {
  constructor() {
    super(arguments);
    this.state = {
      data: immutable({
        formValues: {
          firstName: {
            value: '',
            touched: false
          },
          lastName: {
            value: '',
            touched: false
          }
        },
        errors: {}
      })
    };
  }

  onChange(event, inputName) {
    const newState = this.state.data.setIn(['formValues', inputName], {
      value: event.target.value,
      touched: true
    });
    this.setState({data: newState}, this.validateForm);
  }

  validateForm() {
    const validateRequired = (inputName, data) => {
      const value = data.formValues[inputName].value ? null : 'This field is required';
      return data.setIn(['errors', inputName], value);
    };
    const data = this.state.data;
    let newData = data;
    for (const inputName of Object.keys(data.formValues)) {
      switch (inputName) {
        case 'firstName':
          newData = validateRequired(inputName, newData);
          break;
        case 'lastName':
          newData = validateRequired(inputName, newData);
          break;
        default:
          throw new Error('Invalid inputName: ' + inputName);
      }
    }
    this.setState({data: newData});
  }

  render() {
    const { formValues: { firstName, lastName }, errors } = this.state.data;
    return (
      <div className="container">
        <h1>Without Redux-Form</h1>

        <label htmlFor="firstName">First name</label>
        <input type="text" className="form-control" value={firstName.value} onChange={event => this.onChange(event, 'firstName')} onBlur={event => this.onChange(event, 'firstName')}/>
        {firstName.touched && errors.firstName && <div className="text-danger">{errors.firstName}</div>}
        <label htmlFor="lastName">Last name</label>
        <input type="text" className="form-control" value={lastName.value} onChange={event => this.onChange(event, 'lastName')} onBlur={event => this.onChange(event, 'lastName')}/>
        {lastName.touched && errors.lastName && <div className="text-danger">{errors.lastName}</div>}
      </div>
    );
  }
}
