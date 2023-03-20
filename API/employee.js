const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

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

async function addEmployee(_, { employee }) {
  const db = getDb();
  employeeValidate(employee);
  employee.id = await getNextSequence("employees");

  const result = await db.collection("employees").insertOne(employee);
  const savedEmployee = await db
    .collection("employees")
    .findOne({ _id: result.insertedId });
  return savedEmployee;
}

module.exports = { employeeList, addEmployee };