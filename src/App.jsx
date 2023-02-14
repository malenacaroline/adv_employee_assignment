const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function EmployeeSearch() {
  return (
    <div className="search">
      <form name="searchEmployee" onSubmit={() => null}>
        <input type="text" name="firstname" placeholder="First Name" />
        <input type="text" name="department" placeholder="Department" />
        <select
          name="department"
          placeholder="Department"
          aria-label="label for the select"
        >
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
        </select>
        <input type="text" name="type" placeholder="Type" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

function EmployeeRow(props) {
  const employee = props.employee;
  return (
    <tr>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.age}</td>
      <td>{employee.dateOfJoining.toDateString()}</td>
      <td>{employee.title}</td>
      <td>{employee.department}</td>
      <td>{employee.type}</td>
      <td>{employee.status ? 1 : 0}</td>
    </tr>
  );
}

function EmployeeTable(props) {
  const employeeRows = props.employees.map((employee) => (
    <EmployeeRow key={employee.id} employee={employee} />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>firstName</th>
          <th>lastName</th>
          <th>age</th>
          <th>dateOfJoining</th>
          <th>title</th>
          <th>department</th>
          <th>type</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>{employeeRows}</tbody>
    </table>
  );
}

function AddEmployee(props) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.addEmployee;
    const employee = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: Number(form.age.value),
      dateOfJoining: new Date(form.dateOfJoining.value),
      title: form.title.value,
      department: form.department.value,
      type: form.type.value,
      status: true,
    };
    props.createEmployee(employee);
    form.firstName.value = "";
    form.lastName.value = "";
    form.age.value = "";
    form.dateOfJoining.value = "";
    form.title.value = "Employee";
    form.department.value = "IT";
    form.type.value = "FullTime";
  }

  return (
    <form name="addEmployee" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
      />
      <br></br>

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
      />
      <br></br>

      <label htmlFor="age">Age</label>
      <input
        type="number"
        name="age"
        id="age"
        placeholder="Age"
        min={20}
        max={70}
      />
      <br></br>

      <label htmlFor="dateOfJoining">Date Of Joining</label>
      <input
        type="text"
        name="dateOfJoining"
        id="dateOfJoining"
        placeholder="Date Of Joining"
      />
      <br></br>

      <label htmlFor="title">Title</label>
      <select
        name="title"
        id="title"
        placeholder="tite"
        aria-label="label for title select"
      >
        <option value="Employee">Employee</option>
        <option value="Manager">Manager</option>
        <option value="Director">Director</option>
        <option value="VP">VP</option>
      </select>
      <br></br>

      <label htmlFor="departament">Department</label>
      <select
        name="department"
        id="department"
        placeholder="Department"
        aria-label="label for department select"
      >
        <option value="IT">IT</option>
        <option value="Marketing">Marketing</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
      </select>
      <br></br>

      <label htmlFor="type">Employee Type</label>
      <select
        name="type"
        id="type"
        placeholder="Employee Type"
        aria-label="label for employee type select"
      >
        <option value="FullTime">FullTime</option>
        <option value="PartTime">PartTime</option>
        <option value="Contract">Contract</option>
        <option value="Seasonal">Seasonal</option>
      </select>
      <br></br>

      <input type="submit" value="Add Employee" />
    </form>
  );
}

async function graphQLFetch(query, variables) {
  try {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

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

function EmployeeList() {
  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const query = `query {
      employeeList {
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

    const data = await graphQLFetch(query);
    if (data)
      setEmployees(data.employeeList);
  }

  async function createEmployee(employee) {
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
      <h1>Employee Management System</h1>
      <EmployeeSearch />
      <hr />
      <EmployeeTable employees={employees} />
      <hr />
      <AddEmployee createEmployee={createEmployee} />
    </React.Fragment>
  );
}

const element = <EmployeeList />;

ReactDOM.render(element, document.getElementById("contents"));
