const initialIssues = [
  {
    id: 1,
    status: "New",
    owner: "Ravan",
    effort: 5,
    created: new Date("2018-08-15"),
    due: undefined,
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    effort: 14,
    created: new Date("2018-08-16"),
    due: new Date("2018-08-30"),
    title: "Missing bottom border on panel",
  },
];

function EmployeeSearch() {
  const handleNameInput = (e) => {
    alert("handleNameInput");
  };

  return (
    <div>
      <form name="employeeSearch" onSubmit={handleNameInput}>
        <input type="text" name="employeeFName" placeholder="First Name" />
        <input type="text" name="employeeLName" placeholder="Last Name" />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}

function EmployeeRow(props) {
  const issue = props.issue;
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ""}</td>
      <td>{issue.title}</td>
    </tr>
  );
}

function EmployeeTable(props) {
  const issueRows = props.issues.map((issue) => (
    <EmployeeRow key={issue.id} issue={issue} />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
  );
}

function EmployeeCreate(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.forms.employeeCreate;
    const employee = {
      owner: form.owner.value,
      title: form.title.value,
      status: "New",
    };
    props.createemployee(employee);
    form.owner.value = "";
    form.title.value = "";
  };

  return (
    <form name="employeeCreate" onSubmit={handleSubmit}>
      <label for="firstname">First Name</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        placeholder="First Name"
      />
      <br></br>

      <label for="lastname">Last Name</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Last Name"
      />
      <br></br>

      <label for="age">Age</label>
      <input type="text" name="age" id="age" placeholder="Age" />
      <br></br>

      <label for="joingDate">Date Of Joining</label>
      <input
        type="text"
        name="joingDate"
        id="joingDate"
        placeholder="Date Of Joining"
      />
      <br></br>

      <label for="title">Title</label>
      <input type="text" name="title" id="title" placeholder="Title" />
      <br></br>

      <label for="firstname">Department</label>
      <input
        type="text"
        name="department"
        id="department"
        placeholder="Department"
      />
      <br></br>

      <label for="firstname">EmployeeType</label>
      <input
        type="text"
        name="employeeType"
        id="employeeType"
        placeholder="Employee Type"
      />
      <br></br>
      <input type="submit" value="Add Employee" />
    </form>
  );
}

function EmployeeDirectory() {
  const [employees, setEmployees] = React.useState(initialIssues);

  const createIssue = (issue) => {
    issue.id = employees.lenght + 1;
    issue.created = new Date();
    setEmployees([...employees, issue]);
  };

  return (
    <React.Fragment>
      <h1>Issue Tracker</h1>
      <EmployeeSearch />
      <hr />
      <EmployeeTable issues={employees} />
      <hr />
      <EmployeeCreate createIssue={createIssue} />
    </React.Fragment>
  );
}

const element = <EmployeeDirectory />;

ReactDOM.render(element, document.getElementById("contents"));
