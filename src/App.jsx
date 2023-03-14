const dateCheckRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");
const jsonDateChecker = (key, value) => {
  if (dateCheckRegex.test(value)) return new Date(value);
  return value;
};

const isNull = (value) => !value;

//Component to create form to search employee(s)
class EmployeeSearch extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <EmployeeForm
        actionType="search"
        queryEmployee={this.props.queryEmployee}
      ></EmployeeForm>
    );
  }
}

//Component to create rows of populating with employee data
class EmployeeRow extends React.Component {
  constructor(props) {
    super(props);
  }

  // const employee = this.props.employee;
  render() {
    return (
      <tr>
        <td scope="row">{this.props.employee.firstName}</td>
        <td scope="row">{this.props.employee.lastName}</td>
        <td scope="row" className="text-center">
          {this.props.employee.age}
        </td>
        <td scope="row" className="text-center">
          {this.props.employee.dateOfJoining.toISOString().split("T")[0]}
        </td>
        <td scope="row">{this.props.employee.title}</td>
        <td scope="row">{this.props.employee.department}</td>
        <td scope="row">{this.props.employee.type}</td>
        <td scope="row" className="text-center">
          {this.props.employee.status ? 1 : 0}
        </td>
      </tr>
    );
  }
}

//Component to create table to show employee data
class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
  }

  getTableRows = () => {
    return this.props.employees.map((employee) => (
      <EmployeeRow key={employee.id} employee={employee} />
    ));
  };

  render() {
    return (
      <table className="table table-hover table-bordered">
        <thead className="text-center">
          <tr className="table-primary">
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Age</th>
            <th scope="col">Date of Joining</th>
            <th scope="col">Job Title</th>
            <th scope="col">Department</th>
            <th scope="col">Employee Type</th>
            <th scope="col">Current Status</th>
          </tr>
        </thead>
        <tbody>{this.getTableRows()}</tbody>
      </table>
    );
  }
}

// Add is-invalid class when field is invalid
const addIsInvalid = (id) =>
  document.getElementById(id).classList.add("is-invalid");

// Remove is-invalid class when field is no more invalid
const removeIsInvalid = (id) =>
  document.getElementById(id).classList.remove("is-invalid");

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: this.props.actionType === "add",
      isSearch: this.props.actionType === "search",
    };

    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  isValid() {
    resetError();

    let hasErrors = false;
    const firstName = this.state.form.firstName.value;
    const lastName = this.state.form.lastName.value;

    if (firstName.length < 2) {
      hasErrors = true;
      addIsInvalid(`${props.actionType}-firstName`);
    }

    if (lastName.length < 2) {
      hasErrors = true;
      addIsInvalid(`${props.actionType}-lastName`);
    }

    return !hasErrors;
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms[this.props.actionType];
    if (this.state.isAdd && !isValid()) return;

    const employee = {};
    if (!isNull(form.firstName.value))
      employee.firstName = form.firstName.value;
    if (!isNull(form.lastName.value))
      employee.lastName = form.lastName.value;
    if (!isNull(form.age.value))
      employee.age = Number(form.age.value);
    if (!isNull(form.dateOfJoining.value))
      employee.dateOfJoining = new Date(form.dateOfJoining.value);
    if (!isNull(form.title.value))
      employee.title = form.title.value;
    if (!isNull(form.department.value))
      employee.department = form.department.value;
    if (!isNull(form.type.value))
      employee.type = form.type.value;
    if (this.state.isAdd) employee.status = true;

    this.props.queryEmployee(employee);
    if (this.state.isAdd) resetForm();
  }

  resetForm() {
    const form = document.forms[this.props.actionType];
    form.firstName.value = "";
    form.lastName.value = "";
    form.age.value = "";
    form.dateOfJoining.value = "";
    form.title.value = this.state.isAdd ? "Employee" : "";
    form.department.value = this.state.isAdd ? "IT" : "";
    form.type.value = this.state.isAdd ? "FullTime" : "";
    resetError();
  }

  resetError() {
    removeIsInvalid(`${this.props.actionType}-firstName`);
    removeIsInvalid(`${this.props.actionType}-lastName`);
  }

  render() {
    return (
      <form
        name={this.props.actionType}
        id={this.props.actionType}
        onSubmit={this.handleSubmit}
      >
        <div className="form-group has-danger">
          <label htmlFor="firstName" className="form-label mt-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id={`${this.props.actionType}-firstName`}
            placeholder="John"
            className="form-control"
            required={this.state.isAdd}
          />
          <div className="invalid-feedback">
            Must be be at least 2 characters.
          </div>
        </div>
        <div className="form-group has-danger">
          <label htmlFor="lastName" className="form-label mt-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id={`${this.props.actionType}-lastName`}
            placeholder="Smith"
            className="form-control"
            required={this.state.isAdd}
          />
          <div className="invalid-feedback">
            Must be be at least 2 characters.
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="age" className="form-label mt-2">
            Age
          </label>
          <input
            type="number"
            name="age"
            id={`${this.props.actionType}-age`}
            placeholder="35"
            min={20}
            max={70}
            className="form-control"
            required={this.state.isAdd}
          />
          <small
            id={`${this.props.actionType}-ageHelp`}
            className="form-text text-muted"
          >
            Age must be between 20 and 70.
          </small>
        </div>
        <div className="form-group has-danger">
          <label htmlFor="dateOfJoining" className="form-label mt-2">
            Date of Joining
          </label>
          <input
            type="date"
            name="dateOfJoining"
            id={`${this.props.actionType}-dateOfJoining`}
            placeholder="mm/dd/yyyy"
            className="form-control"
            required={this.state.isAdd}
          />
          <div className="invalid-feedback">Invalid date.</div>
        </div>
        <div className="form-group">
          <label htmlFor="title" className="form-label mt-2">
            Job Title
          </label>
          <select
            name="title"
            id={`${this.props.actionType}-title`}
            className="form-select"
            aria-label="label for title select"
            required={this.state.isAdd}
          >
            {this.state.isSearch && <option value="" defaultValue></option>}
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="department" className="form-label mt-2">
            Department
          </label>
          <select
            name="department"
            id={`${this.props.actionType}-department`}
            className="form-select"
            aria-label="label for department select"
            required={this.state.isAdd}
          >
            {this.state.isSearch && <option value="" defaultValue></option>}
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type" className="form-label mt-2">
            Employee Type
          </label>
          <select
            name="type"
            id={`${this.props.actionType}-type`}
            className="form-select"
            aria-label="label for type select"
            required={this.state.isAdd}
          >
            {this.state.isSearch && <option value="" defaultValue></option>}
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>

        <div className="d-grid gap-2">
          <input
            className="btn btn-primary mt-3 full"
            type="submit"
            value={this.state.isAdd ? "Add Employee" : "Search Employee"}
          />
        </div>
      </form>
    );
  }
}

// Component to create form to add employee
class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <EmployeeForm
        actionType="add"
        queryEmployee={this.props.queryEmployee}
      ></EmployeeForm>
    );
  }
}

//Request to graphql
async function graphQLFetch(query, variables) {
  try {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateChecker);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == "BAD_USER_INPUT") {
        const details = error.extensions.exception.errors.join("\n ");
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

//Component to show final result screen with components and employeee data
function EmployeeDirectory() {
  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    loadData();
  }, []);

  async function loadData(employee) {
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
    if (data) setEmployees(data.employeeList);
  }

  async function addEmployee(employee) {
    const query = `mutation addEmployee($employee: EmployeeInputs!) {
       addEmployee(employee: $employee) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { employee });
    if (data) loadData();
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <div className="container justify-content-center">
          <a className="navbar-brand" href="#">
            <strong>Employee Management System</strong>
          </a>
        </div>
      </nav>
      <div className="container d-flex">
        <div className="col-md-3">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
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
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
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
          <div className="tab-content pe-3" id="myTabContent">
            <div
              className="tab-pane show active"
              id="search-employee-tab-pane"
              role="tabpanel"
              aria-labelledby="search-employee-tab"
              tabIndex="0"
            >
              <EmployeeSearch queryEmployee={loadData} />
            </div>
            <div
              className="tab-pane"
              id="add-employee-tab-pane"
              role="tabpanel"
              aria-labelledby="add-employee-tab"
              tabIndex="0"
            >
              <EmployeeCreate queryEmployee={addEmployee} />
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <EmployeeTable employees={employees} />
        </div>
      </div>
    </React.Fragment>
  );
}

const element = <EmployeeDirectory />;

ReactDOM.render(element, document.getElementById("employee-contents"));
