import React from 'react';
import EmployeeForm from "./EmployeeForm.jsx";

export default class EmployeeAdd extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EmployeeForm
        actionType="add"
        queryEmployee={this.props.queryEmployee}
      ></EmployeeForm>
    );
  }
}
