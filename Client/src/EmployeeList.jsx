import React from 'react';
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeAdd from "./EmployeeAdd.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import graphQLFetch from './graphQLFetch.js';

export default class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = { employees: [] };
    this.loadData = this.loadData.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
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

  async addEmployee(employee) {
    const query = `mutation addEmployee($employee: EmployeeInputs!) {
       addEmployee(employee: $employee) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { employee });
    if (data) this.loadData();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Employee Management System</h1>
        <div>
          <div>
            <ul>
              <li>
                <button
                  id="search-employee-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#search-employee-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="search-employee-tab-pane"
                  aria-selected="true"
                >
                  Search
                </button>
              </li>
              <li>
                <button
                  id="add-employee-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#add-employee-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="add-employee-tab-pane"
                  aria-selected="false"
                >
                  Add
                </button>
              </li>
            </ul>
            <div id="myTabContent">
              <div
                id="search-employee-tab-pane"
                role="tabpanel"
                aria-labelledby="search-employee-tab"
                tabIndex="0"
              >
                <EmployeeSearch queryEmployee={this.loadData} />
              </div>
              <div
                id="add-employee-tab-pane"
                role="tabpanel"
                aria-labelledby="add-employee-tab"
                tabIndex="0"
              >
                <EmployeeAdd queryEmployee={this.addEmployee} />
              </div>
            </div>
          </div>
          <div>
            <EmployeeTable employees={this.state.employees} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}