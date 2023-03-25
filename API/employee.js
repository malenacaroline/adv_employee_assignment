const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db');

function employeeValidate(employee) {
  const errors = [];
  if (employee.firstName.length < 2) {
    errors.push("Field title must be at least 2 characters long.");
  }
  if (employee.lastName.length < 2) {
    errors.push("Field title must be at least 2 characters long.");
  }
  if (employee.age < 20 || employee.age > 70) {
    errors.push("Field age must be between 20 and 70");
  }
  if (errors.length > 0) {
    throw new UserInputError("Invalid input(s)", { errors });
  }
}

async function employeeList(_, { employee }) {
  const db = getDb();
  const employees = await db.collection("employees").find(employee).toArray();
  return employees;
}

async function employeeDetails(_, { id }) {
  const db = getDb();
  const employeesDetails = await db.collection("employees").findOne({ id });
  return employeesDetails;
}

async function addEmployee(_, { employee }) {
  const db = getDb();
  employeeValidate(employee);
  employee.id = await getNextSequence("employees");

  const result = await db.collection("employees").insertOne(employee);
  const createdEmployee = await db
    .collection("employees")
    .findOne({ _id: result.insertedId });
  return createdEmployee;
}

async function updateEmployee(_, { employee }) {
  const db = getDb();
  const updatedEmployee = await db.collection("employees").updateOne({ id: employee.id }, { $set: { title: employee.title, department: employee.department, status: employee.status } });
  return updatedEmployee;
}

async function deleteEmployee(_, { id }) {
  const db = getDb();
  const deletedEmployee = await db.collection("employees").deleteOne({ id });
  return deletedEmployee;
}

module.exports = {
  employeeList,
  employeeDetails,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
