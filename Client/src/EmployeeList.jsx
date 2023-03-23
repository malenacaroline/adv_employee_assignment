import React from 'react';
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import graphQLFetch from './graphQLFetch.js';

export default class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = { employees: [] };
    this.loadData = this.loadData.bind(this);
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