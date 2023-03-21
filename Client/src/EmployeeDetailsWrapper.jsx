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

class EmployeeDetailsWrapper extends React.Component {
  constructor() {
    super();
    this.state = { employeeDetails: undefined };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    console.log("Call load data");
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
    console.log("data", data);
    if (data) this.setState({ employeeDetails: data.employeeDetails });
  }

  

  render() {
    const Wrapper = this.props.wrappedComponent;
    return(
      <Wrapper employeeDetails={this.state.employeeDetails}></Wrapper>
    );
  }
}
export default withRouter(EmployeeDetailsWrapper);