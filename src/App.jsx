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
        <td scope="row">
          {this.props.employee.age}
        </td>
        <td scope="row">
          {this.props.employee.dateOfJoining.toISOString().split("T")[0]}
        </td>
        <td scope="row">{this.props.employee.title}</td>
        <td scope="row">{this.props.employee.department}</td>
        <td scope="row">{this.props.employee.type}</td>
        <td scope="row">
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
      <table>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Age</th>
          <th scope="col">Date of Joining</th>
          <th scope="col">Job Title</th>
          <th scope="col">Department</th>
          <th scope="col">Employee Type</th>
          <th scope="col">Current Status</th>
        </tr>
        {this.getTableRows()}
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
    this.resetError();

    let hasErrors = false;
    const form = document.forms[this.props.actionType];
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;

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
    if (this.state.isAdd && !this.isValid()) return;

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
    if (this.state.isAdd) this.resetForm();
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
    this.resetError();
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
        <div>
          <label htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id={`${this.props.actionType}-firstName`}
            placeholder="John"
            required={this.state.isAdd}
          />
          <div>
            Must be be at least 2 characters.
          </div>
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id={`${this.props.actionType}-lastName`}
            placeholder="Smith"
            required={this.state.isAdd}
          />
          <div>
            Must be be at least 2 characters.
          </div>
        </div>
        <div>
          <label htmlFor="age">
            Age
          </label>
          <input
            type="number"
            name="age"
            id={`${this.props.actionType}-age`}
            placeholder="35"
            min={20}
            max={70}
            required={this.state.isAdd}
          />
          <small
            id={`${this.props.actionType}-ageHelp`}
          >
            Age must be between 20 and 70.
          </small>
        </div>
        <div>
          <label htmlFor="dateOfJoining">
            Date of Joining
          </label>
          <input
            type="date"
            name="dateOfJoining"
            id={`${this.props.actionType}-dateOfJoining`}
            placeholder="mm/dd/yyyy"
            required={this.state.isAdd}
          />
          <div>Invalid date.</div>
        </div>
        <div>
          <label htmlFor="title">
            Job Title
          </label>
          <select
            name="title"
            id={`${this.props.actionType}-title`}
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
        <div>
          <label htmlFor="department">
            Department
          </label>
          <select
            name="department"
            id={`${this.props.actionType}-department`}
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

        <div>
          <label htmlFor="type">
            Employee Type
          </label>
          <select
            name="type"
            id={`${this.props.actionType}-type`}
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

        <div>
          <input
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
class EmployeeDirectory extends React.Component {

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
    if (data) this.setState({employees: data.employeeList});
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
                <EmployeeCreate queryEmployee={this.addEmployee} />
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

const element = <EmployeeDirectory />;

ReactDOM.render(element, document.getElementById("employee-contents"));
