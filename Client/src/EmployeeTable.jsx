import React from 'react';
import { Link } from 'react-router-dom';
class EmployeeRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td scope="row">{this.props.employee.id}</td>
        <td scope="row">{this.props.employee.firstName}</td>
        <td scope="row">{this.props.employee.lastName}</td>
        <td scope="row">{this.props.employee.age}</td>
        <td scope="row">
          {this.props.employee.dateOfJoining.toISOString().split("T")[0]}
        </td>
        <td scope="row">{this.props.employee.title}</td>
        <td scope="row">{this.props.employee.department}</td>
        <td scope="row">{this.props.employee.type}</td>
        <td scope="row">{this.props.employee.status ? 1 : 0}</td>
        <td scope="row">
          <Link to={`/employees/${this.props.employee.id}`}>Details</Link>
          {' | '}
          <Link to={`/employees/update/${this.props.employee.id}`}>Update</Link>
          {' | '}
          <Link to={`/employees/delete/${this.props.employee.id}`}>Delete</Link>
        </td>
      </tr>
    );
  }
}

// Component to create table to show employee data
export default class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
  }

  getTableRows = () => this.props.employees.map(employee => (
    <EmployeeRow key={employee.id} employee={employee} />
  ));

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Age</th>
            <th scope="col">Date of Joining</th>
            <th scope="col">Job Title</th>
            <th scope="col">Department</th>
            <th scope="col">Employee Type</th>
            <th scope="col">Current Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{this.getTableRows()}</tbody>
      </table>
    );
  }
}