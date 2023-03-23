import React from 'react';
import EmployeeForm from "./EmployeeForm.jsx";
import graphQLFetch from './graphQLFetch.js';

export default class EmployeeDelete extends React.Component {
  constructor(props) {
    super(props);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  async deleteEmployee() {
    const id = Number(this.props.employeeDetails.id);
    const query = `mutation deleteEmployee($id: Int!) {
      deleteEmployee(id: $id) {
        id
      }
    }`;

    await graphQLFetch(query, { id });
  }

  render() {
    return (
      <div>
        <h1>ESM - Employee Deletion </h1>
        <EmployeeForm
          actionType="delete"
          queryEmployee={this.deleteEmployee}
          employeeDetails={this.props.employeeDetails}
        ></EmployeeForm>
      </div>
    );
  }
}