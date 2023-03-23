import React from 'react';
import EmployeeForm from "./EmployeeForm.jsx";

export default class EmployeeDetails extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>ESM - Employee Details </h1>
        <EmployeeForm
          actionType="details"
          employeeDetails={this.props.employeeDetails}
        ></EmployeeForm>
      </div>
    );
  }
}