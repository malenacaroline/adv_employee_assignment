import React from 'react';
import EmployeeSearch from "./EmployeeSearch.jsx";
// import EmployeeAdd from "./EmployeeAdd.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import graphQLFetch from './graphQLFetch.js';

export default class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = { employees: [] };
    this.loadData = this.loadData.bind(this);
    // this.addEmployee = this.addEmployee.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData(employee) {
    const query = `query Employees($employee: SearchEmployeeInputs){
        employeeList(employee: $employee) {
          id
          firstName
          lastName
          age
          dateOfJoining
          title
          department
          type
          status
        }
    }`;

    const data = await graphQLFetch(query, { employee });
    if (data) this.setState({ employees: data.employeeList });
  }

  // async addEmployee(employee) {
  //   const query = `mutation addEmployee($employee: EmployeeInputs!) {
  //      addEmployee(employee: $employee) {
  //       id
  //     }
  //   }`;

  //   const data = await graphQLFetch(query, { employee });
  //   if (data) this.loadData();
  // }

  render() {
    return (
      <React.Fragment>
        <h1>Employee Management System</h1>
        <div className="container">
          <EmployeeSearch queryEmployee={this.loadData} />
          <EmployeeTable employees={this.state.employees} />
        </div>
      </React.Fragment>
    );
  }
}