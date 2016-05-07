import React, {Component} from 'react';

export default class WithoutReduxForm extends Component {
  constructor() {
    super(arguments);
    this.state = {
      formValues: {
        firstName: {
          value: '',
          touched: false
        }
      },
      errors: {}
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
    }, this.validate);
  }

  validate() {
    for (const inputName of Object.keys(this.state.formValues)) {
      switch (inputName) {
        case 'firstName':
          if (this.state.formValues[inputName].value) {
            this.setState({
              errors: {
                [inputName]: null
              }
            });
          } else {
            this.setState({
              errors: {
                [inputName]: 'This field is required'
              }
            });
          }
          break;
        default:
          throw new Error('Invalid inputName: ' + inputName);
      }
    }
  }

  render() {
    const { formValues: { firstName }, errors } = this.state;
    return (
      <div className="container">
        <h1>Without Redux-Form</h1>

        <label htmlFor="firstName">First name</label>
        <input type="text" className="form-control" {...firstName} onChange={event => this.onChange(event, 'firstName')} onBlur={event => this.onChange(event, 'firstName')}/>
        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
      </div>
    );
  }
}
