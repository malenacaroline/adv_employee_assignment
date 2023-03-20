import React from 'react';
import EmployeeForm from "./EmployeeForm.jsx";
import graphQLFetch from './graphQLFetch.js';

export default class EmployeeUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.updateEmployee = this.updateEmployee.bind(this);
  }

  async updateEmployee(employee) {
    const query = `mutation updateEmployee($employee: EmployeeInputs!) {
       updateEmployee(employee: $employee) {
        id
      }
    }`;

    await graphQLFetch(query, { employee });
  }

  render() {
    return (
      <div>
        <h1>ESM - Update Employee</h1>
        <EmployeeForm
          actionType="update"
          queryEmployee={this.updateEmployee}
        ></EmployeeForm>
      </div>
    );
  }
}
