import React from 'react';

const isNull = value => !value;

// Add is-invalid class when field is invalid
const addIsInvalid = id => document.getElementById(id).classList.add("is-invalid");

// Remove is-invalid class when field is no more invalid
const removeIsInvalid = id => document.getElementById(id).classList.remove("is-invalid");

export default class EmployeeForm extends React.Component {
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
    if (!isNull(form.firstName.value)) employee.firstName = form.firstName.value;
    if (!isNull(form.lastName.value)) employee.lastName = form.lastName.value;
    if (!isNull(form.age.value)) employee.age = Number(form.age.value);
    if (!isNull(form.dateOfJoining.value)) {
      employee.dateOfJoining = new Date(form.dateOfJoining.value);
    }
    if (!isNull(form.title.value)) employee.title = form.title.value;
    if (!isNull(form.department.value)) employee.department = form.department.value;
    if (!isNull(form.type.value)) employee.type = form.type.value;
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
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id={`${this.props.actionType}-firstName`}
            placeholder="John"
            required={this.state.isAdd}
          />
          <div>Must be be at least 2 characters.</div>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id={`${this.props.actionType}-lastName`}
            placeholder="Smith"
            required={this.state.isAdd}
          />
          <div>Must be be at least 2 characters.</div>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id={`${this.props.actionType}-age`}
            placeholder="35"
            min={20}
            max={70}
            required={this.state.isAdd}
          />
          <small id={`${this.props.actionType}-ageHelp`}>
            Age must be between 20 and 70.
          </small>
        </div>
        <div>
          <label htmlFor="dateOfJoining">Date of Joining</label>
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
          <label htmlFor="title">Job Title</label>
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
          <label htmlFor="department">Department</label>
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
          <label htmlFor="type">Employee Type</label>
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