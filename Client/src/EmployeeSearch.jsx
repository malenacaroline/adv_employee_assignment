import React from 'react';
import EmployeeForm from "./EmployeeForm.jsx";

export default class EmployeeSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EmployeeForm
        actionType="search"
        queryEmployee={this.props.queryEmployee}
        searchParams={this.props.searchParams}
        setSearchParams={this.props.setSearchParams}
      ></EmployeeForm>
    );
  }
}