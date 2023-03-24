import React from 'react';
import  { Navigate  } from 'react-router-dom';

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
      isDetails: this.props.actionType === "details",
      isUpdate: this.props.actionType === "update",
      isDelete: this.props.actionType === "delete",
    };

    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.resetError = this.resetError.bind(this);
    this.formatDate = this.formatDate.bind(this);
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
      employee.dateOfJoining = new Date(form.dateOfJoining.value);
    }
    if (!isNull(form.title.value)) employee.title = form.title.value;
    if (!isNull(form.department.value)) employee.department = form.department.value;
    if (!isNull(form.type.value)) employee.type = form.type.value;
    if (!isNull(form.status.value)) employee.status = form.status.value === "1";

    this.props.queryEmployee(employee);
    if (this.state.isAdd) this.resetForm();
    if(this.state.isAdd || this.state.isUpdate || this.state.isDelete) <Navigate to='/employees'  />
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

  formatDate(date) {
    return date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, "0") + "-" + date.getDate();
  }

  render() {
    const actionType = this.props.actionType;
    const employeeDetails = this.props.employeeDetails;

    const isAdd = this.state.isAdd;
    const isSearch = this.state.isSearch;
    const isDetails = this.state.isDetails;
    const isUpdate = this.state.isUpdate;
    const isDelete = this.state.isDelete;

    let actionLabel = "";
    if(isAdd) {
      actionLabel = "Add";
    } else if (isSearch){
      actionLabel = "Search";
    } else if(isUpdate) {
      actionLabel = "Update";
    } else {
      actionLabel = "Delete";
    }

    return (
      <form
        name={actionType}
        id={actionType}
        onSubmit={this.handleSubmit}
      >
        <div>
          <input type="hidden" name="id" defaultValue={(isUpdate || isDetails || isDelete) ? employeeDetails?.id: ''}/>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id={`${actionType}-firstName`}
            placeholder="John"
            required={isAdd}
            defaultValue={(isUpdate || isDetails) ? employeeDetails?.firstName: ''}
            readOnly={isUpdate || isDetails || isDelete}
          />
          {isAdd && (<div>Must be be at least 2 characters.</div>)}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id={`${actionType}-lastName`}
            placeholder="Smith"
            required={isAdd}
            defaultValue={(isUpdate || isDetails) ? employeeDetails?.lastName: ''}
            readOnly={isUpdate || isDetails || isDelete}
          />
          {isAdd && (<div>Must be be at least 2 characters.</div>)}
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
            defaultValue={(isUpdate || isDetails || isDelete) ? employeeDetails?.age: ''}
            readOnly={isUpdate || isDetails || isDelete}
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
            defaultValue={(isUpdate || isDetails || isDelete) ? employeeDetails?.dateOfJoining && this.formatDate(employeeDetails?.dateOfJoining) : ''}
            readOnly={isUpdate || isDetails || isDelete}
          />
          {isAdd && (<div>Invalid date.</div>)}
        </div>

        <div>
          <label htmlFor="title">Job Title</label>
          <select
            name="title"
            id={`${actionType}-title`}
            aria-label="label for title select"
            required={isAdd}
            defaultValue={(isUpdate || isDetails || isDelete) ? employeeDetails?.title: ''}
            disabled={isDetails || isDelete}
          >
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
            defaultValue={(isUpdate || isDetails) ? employeeDetails?.department: ''}
            disabled={isDetails || isDelete}
          >
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
            defaultValue={(isUpdate || isDetails) ? employeeDetails?.type: ''}
            disabled={isUpdate || isDetails || isDelete}
          >
            {isSearch && <option value="" defaultValue></option>}
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>

        <div>
          <label htmlFor="status">Current Status</label>
          <select
            name="status"
            id={`${actionType}-status`}
            aria-label="label for status select"
            defaultValue={(isUpdate || isDetails || isDelete) ? employeeDetails?.status: ''}
            disabled={isDetails || isDelete}
          >
            <option value="1">Active</option>
            <option value="0">Not active</option>
          </select>
        </div>

        {(isAdd || isSearch || isUpdate || isDelete) && (<div>
          <input
            type="submit"
            value={`${actionLabel} Employee`}
          />
        </div>)}
      </form>
    );
  }
}