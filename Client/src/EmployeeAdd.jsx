import React from 'react';
import EmployeeForm from "./EmployeeForm.jsx";
import graphQLFetch from './graphQLFetch.js';
import withRouter from './withRouter.jsx';

class EmployeeAdd extends React.Component {
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

    try {
      await graphQLFetch(query, { employee });
      alert("User created successfully");
      this.props.navigate("/employees/");
    } catch (error) {
      alert("Error creating employee");
    }
  }

  render() {
    return (
      <div>
        <h1>EMS - Add Employee</h1>
        <EmployeeForm
          actionType="add"
          queryEmployee={this.addEmployee}
        ></EmployeeForm>
      </div>
    );
  }
}

export default withRouter(EmployeeAdd);
