import React, {Component} from 'react';

export default class WithoutReduxForm extends Component {
  constructor() {
    super(arguments);
    this.state = {
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
    };
  }

  onChange(event, inputName) {
    const newState = Object.assign({}, this.state);
    newState.formValues[inputName] = {
      value: event.target.value,
      touched: true
    };
    this.setState(newState, this.validate);
  }

  validate() {
    const updateState = inputNameX => {
      if (this.state.formValues[inputNameX].value) {
        const newState = Object.assign({}, this.state);
        newState.errors[inputNameX] = null;
        this.setState(newState);
      } else {
        const newState = Object.assign({}, this.state);
        newState.errors[inputNameX] = 'This field is required';
        this.setState(newState);
      }
    };
    for (const inputName of Object.keys(this.state.formValues)) {
      switch (inputName) {
        case 'firstName':
          updateState(inputName);
          break;
        case 'lastName':
          updateState(inputName);
          break;
        default:
          throw new Error('Invalid inputName: ' + inputName);
      }
    }
  }

  render() {
    const { formValues: { firstName, lastName }, errors } = this.state;
    return (
      <div className="container">
        <h1>Without Redux-Form</h1>

        <label htmlFor="firstName">First name</label>
        <input type="text" className="form-control" {...firstName} onChange={event => this.onChange(event, 'firstName')} onBlur={event => this.onChange(event, 'firstName')}/>
        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
        <label htmlFor="lastName">Last name</label>
        <input type="text" className="form-control" {...lastName} onChange={event => this.onChange(event, 'lastName')} onBlur={event => this.onChange(event, 'lastName')}/>
        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
      </div>
    );
  }
}
