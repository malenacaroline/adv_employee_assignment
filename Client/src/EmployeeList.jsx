import React from 'react';
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import graphQLFetch from './graphQLFetch.js';
import withRouter from './withRouter.jsx';

class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = { employees: [] };
    this.loadData = this.loadData.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchParams?.toString()) return;
    const hasSearchParamsChanged = prevProps.searchParams?.toString()
    !== this.props.searchParams?.toString();
    if (hasSearchParamsChanged) this.loadData();
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
        <h1>EMS - Employees List</h1>
        <div className="container">
          <EmployeeSearch
            queryEmployee={this.loadData}
            searchParams={this.props.searchParams}
            setSearchParams={this.props.setSearchParams}
          />
          <EmployeeTable employees={this.state.employees} />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(EmployeeList);
