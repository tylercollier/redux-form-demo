import React, {Component} from 'react';

export default class WithoutReduxForm extends Component {
  handleSubmit(event) {
    console.log(arguments);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <h1>Without Redux-Form</h1>

        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="firstName" className="col-sm-2">First name</label>
            <div className={'col-sm-8 '}>
              <input type="text" className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={this.handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
