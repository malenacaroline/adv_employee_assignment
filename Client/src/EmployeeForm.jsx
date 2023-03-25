import React from 'react';

const isNull = value => !value;

// Add is-invalid class when field is invalid
const addIsInvalid = id => document.getElementById(id).nextElementSibling.classList.add("error");

// Remove is-invalid class when field is no more invalid
const removeIsInvalid = id => document.getElementById(id).nextElementSibling.classList.remove("error");

// Format date to input
const formatDate = (date) => {
  if (isNull(date)) return '';
  return new Date(date).toISOString().slice(0, 10);
};
// Convert URLSearchParams into Object
const parseSearchParamsToObject = (searchParams) => {
  if (isNull(searchParams)) return undefined;
  const result = {};
  for (const [key, value] of searchParams.entries()) result[key] = value;
  if (!isNull(result.age)) result.age = Number(result.age);
  if (!isNull(result.dateOfJoining)) {
    result.dateOfJoining = new Date(result.dateOfJoining).toISOString();
  }
  return result;
};


export default class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: this.props.actionType === "add",
      isSearch: this.props.actionType === "search",
      isDetails: this.props.actionType === "details",
      isUpdate: this.props.actionType === "update",
      errors: null,
    };
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.resetError = this.resetError.bind(this);
    this.setSearchParams = this.setSearchParams.bind(this);
  }

  // Perform search query when there are search parameters
  componentDidMount() {
    const employeeSearchParams = parseSearchParamsToObject(this.props.searchParams);
    if (isNull(employeeSearchParams)) return;
    this.props.queryEmployee(employeeSearchParams);
  }

  isValid() {
    this.resetError();
    let hasErrors = false;
    const form = document.forms[this.props.actionType];
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;

    if (firstName.length < 2) {
      hasErrors = true;
      addIsInvalid(`${this.props.actionType}-firstName`);
    }

    if (lastName.length < 2) {
      hasErrors = true;
      addIsInvalid(`${this.props.actionType}-lastName`);
    }

    return !hasErrors;
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms[this.props.actionType];
    if (this.state.isAdd && !this.isValid()) return;
    const employee = {};
    if (!isNull(form.id.value)) employee.id = Number(form.id.value);
    if (!isNull(form.firstName.value)) employee.firstName = form.firstName.value;
    if (!isNull(form.lastName.value)) employee.lastName = form.lastName.value;
    if (!isNull(form.age.value)) employee.age = Number(form.age.value);
    if (!isNull(form.dateOfJoining.value)) {
      employee.dateOfJoining = new Date(form.dateOfJoining.value).toISOString();
    }
    if (!isNull(form.title.value)) employee.title = form.title.value;
    if (!isNull(form.department.value)) employee.department = form.department.value;
    if (!isNull(form.type.value)) employee.type = form.type.value;
    if (!isNull(form.status?.value)) employee.status = form.status.value === 1;
    if (this.props.searchParams) this.setSearchParams(employee);
    this.props.queryEmployee(employee);
    if (this.state.isAdd) this.resetForm();
  }

  // Set search parameters after search submission
  setSearchParams(employee) {
    const searchedEmployee = employee;
    if (!isNull(searchedEmployee.dateOfJoining)) {
      const form = document.forms[this.props.actionType];
      searchedEmployee.dateOfJoining = form.dateOfJoining.value;
    }
    this.props.setSearchParams(Object.entries(searchedEmployee));
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
    form.status.value = "";
    this.resetError();
  }

  resetError() {
    removeIsInvalid(`${this.props.actionType}-firstName`);
    removeIsInvalid(`${this.props.actionType}-lastName`);
  }

  render() {
    const { actionType } = this.props;
    const {
      isAdd,
      isSearch,
      isDetails,
      isUpdate,
    } = this.state;

    const employeeDetails = this.props.employeeDetails
    || parseSearchParamsToObject(this.props.searchParams);

    let actionLabel = "";
    if (isAdd) {
      actionLabel = "Add";
    } else if (isSearch) {
      actionLabel = "Search";
    } else {
      actionLabel = "Update";
    }

    if ((!employeeDetails && (isUpdate || isDetails))) return null;

    return (
      <form
        name={actionType}
        id={actionType}
        onSubmit={this.handleSubmit}
      >
        <div>
          <input type="hidden" name="id" defaultValue={employeeDetails?.id || ''}/>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id={`${actionType}-firstName`}
            placeholder="John"
            required={isAdd}
            defaultValue={employeeDetails?.firstName || ''}
            readOnly={isUpdate || isDetails}
          />
          {isAdd && (<div>First Name should have at least 2 characters.</div>)}
          {isSearch && (<div>First Name is case-sensitive.</div>)}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id={`${actionType}-lastName`}
            placeholder="Smith"
            required={isAdd}
            defaultValue={employeeDetails?.lastName || ''}
            readOnly={isUpdate || isDetails}
            />
          {isAdd && (<div>Last Name should have at least 2 characters.</div>)}
          {isSearch && (<div>Last Name is case-sensitive.</div>)}
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id={`${actionType}-age`}
            placeholder="35"
            min={20}
            max={70}
            required={isAdd}
            defaultValue={employeeDetails?.age || ''}
            readOnly={isUpdate || isDetails}
          />
          {isAdd && (<div>Age must be between 20 and 70.</div>)}
        </div>

        <div>
          <label htmlFor="dateOfJoining">Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            id={`${actionType}-dateOfJoining`}
            placeholder="mm/dd/yyyy"
            required={isAdd}
            defaultValue={formatDate(employeeDetails?.dateOfJoining)}
            readOnly={isUpdate || isDetails}
          />
        </div>

        <div>
          <label htmlFor="title">Job Title</label>
          <select
            name="title"
            id={`${actionType}-title`}
            aria-label="label for title select"
            required={isAdd}
            defaultValue={employeeDetails?.title || ''}
            disabled={isDetails}
          >
            {isSearch && <option value=""></option>}
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <select
            name="department"
            id={`${actionType}-department`}
            aria-label="label for department select"
            required={isAdd}
            defaultValue={employeeDetails?.department || ''}
            disabled={isDetails}
          >
            {isSearch && <option value=""></option>}
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        <div>
          <label htmlFor="type">Employee Type</label>
          <select
            name="type"
            id={`${actionType}-type`}
            aria-label="label for type select"
            required={isAdd}
            defaultValue={employeeDetails?.type || ''}
            disabled={isUpdate || isDetails}
          >
            {isSearch && <option value=""></option>}
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>

        {!isSearch && (<div>
          <label htmlFor="status">Current Status</label>
          <select
            name="status"
            id={`${actionType}-status`}
            aria-label="label for status select"
            defaultValue={employeeDetails?.status ? 1 : 0}
            disabled={isDetails}
          >
            <option value={1}>Active</option>
            <option value={0}>Not active</option>
          </select>
        </div>)}

        {!isDetails && (<div>
          <input
            type="submit"
            value={`${actionLabel} Employee`}
          />
        </div>)}
      </form>
    );
  }
}
