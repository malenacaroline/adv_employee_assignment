import React from 'react';
import graphQLFetch from './graphQLFetch.js';
import {  useParams } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
  const params = useParams();
 
  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};

class EmployeeDetails extends React.Component {
  constructor() {
    super();
    this.state = { employeeDetails: undefined };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const id = Number(this.props.params.id);
    const query = `query EmployeeDetails($id: Int){
      employeeDetails(id: $id) {
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

    const data = await graphQLFetch(query, { id });
    if (data) this.setState({ employeeDetails: data.employeeDetails });
  }
  render() {
    return(<h1>ESM - Employee Details</h1>);
  }
}
export default withRouter(EmployeeDetails);