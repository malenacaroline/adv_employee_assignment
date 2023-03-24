import React from 'react';
import EmployeeForm from "./EmployeeForm.jsx";
import graphQLFetch from './graphQLFetch.js';
export default class EmployeeUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.updateEmployee = this.updateEmployee.bind(this);
  }

  async updateEmployee(employee) {
    const query = `mutation updateEmployee($employee: SearchEmployeeInputs!) {
       updateEmployee(employee: $employee) {
        id
      }
    }`;

    try{
      await graphQLFetch(query, {employee});
      alert("User updated successfully");
      this.props.navigate("/employees");
    } catch(error) {
      console.log(error);
      alert("Error updating employee");
    }
  }
  render() {
    return (
      <div>
        <h1>ESM - Update Employee</h1>
        <EmployeeForm
          actionType="update"
          queryEmployee={this.updateEmployee}
          employeeDetails={this.props.employeeDetails}
        ></EmployeeForm>
      </div>
    );
  }
}
