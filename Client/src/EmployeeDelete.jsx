import React from 'react';
import graphQLFetch from './graphQLFetch.js';
import withRouter from './withRouter.jsx';

class EmployeeDelete extends React.Component {
  constructor(props) {
    super(props);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  async deleteEmployee() {
    const id = Number(this.props.params.id);
    const query = `mutation deleteEmployee($id: Int!) {
      deleteEmployee(id: $id) {
        id
      }
    }`;

    try {
      await graphQLFetch(query, { id });
      alert("User deleted successfully");
      this.props.navigate("/employees/");
    } catch (error) {
      alert("Error deleting employee");
    }
  }

  render() {
    return (
      <div>
        <h1>EMS - Employee Deletion </h1>
        <div className="delete-msg">
          <p>Do you want to delete this employee?</p>
          <button onClick={this.deleteEmployee} type="button">Delete Employee</button>
          <button onClick={() => this.props.navigate("/employees")} type="button">Cancel</button>
        </div>
      </div>
    );
  }
}

export default withRouter(EmployeeDelete);
