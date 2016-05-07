import React, {Component} from 'react';

export default class WithoutReduxForm extends Component {
  constructor() {
    super(arguments);
    this.state = {
      formValues: {
        firstName: {
          value: '',
          touched: false,
          errors: null
        }
      }
    };
  }

  onChange(event, inputName) {
    this.setState({
      formValues: {
        [inputName]: {
          value: event.target.value,
          touched: true
        }
      }
    });
    this.validate(inputName, event.target.value);
  }

  validate(inputName, value) {
    switch (inputName) {
      case 'firstName':
        if (!value) {
          this.setState({
            formValues: {
              [inputName]: {
                errors: 'First name is required'
              }
            }
          });
        }
        break;
      default:
        throw new Error('Invalid inputName: ' + inputName);
    }
  }

  render() {
    const { formValues: { firstName } } = this.state;
    return (
      <div className="container">
        <h1>Without Redux-Form</h1>

        <label htmlFor="firstName">First name</label>
        <input type="text" className="form-control" {...firstName} onChange={event => this.onChange(event, 'firstName')} onBlur={event => this.onChange(event, 'firstName')}/>
        {firstName.errors && <div className="text-danger">{firstName.errors}</div>}
      </div>
    );
  }
}
