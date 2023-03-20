const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphql_date.js');
const employee = require('./employee');

const resolvers = {
  Query: {
    employeeList: employee.employeeList,
  },
  Mutation: {
    addEmployee: employee.addEmployee,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync("schema.graphql", "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

async function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || "true") === "true";
  await server.start();
  server.applyMiddleware({ app, path: "/graphql", cors: enableCors });
}

module.exports = { installHandler };