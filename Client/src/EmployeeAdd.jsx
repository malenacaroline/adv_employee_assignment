import React from 'react';
import EmployeeForm from "./EmployeeForm.jsx";
import graphQLFetch from './graphQLFetch.js';

export default class EmployeeAdd extends React.Component {
  constructor(props) {
    super(props);
    this.addEmployee = this.addEmployee.bind(this);
  }

  async addEmployee(employee) {
    const query = `mutation addEmployee($employee: EmployeeInputs!) {
       addEmployee(employee: $employee) {
        id
      }
    }`;

    await graphQLFetch(query, { employee });
  }

  render() {
    return (
      <div>
        <h1>ESM - Add Employee</h1>
        <EmployeeForm
          actionType="add"
          queryEmployee={this.addEmployee}
        ></EmployeeForm>
      </div>
    );
  }
}
