const fileSync = require("fs");
require("dotenv").config();
const express = require("express");
const { ApolloServer, UserInputError } = require("apollo-server-express");
const { GraphQLScalarType } = require("graphql");
const { MongoClient } = require("mongodb");

const dbUrl = process.env.DB_URL || "mongodb+srv://malena:123@advfsmalena.q9gdl6b.mongodb.net/?retryWrites=true&w=majority";

let db;

const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  serialize(value) {
    return value.toISOString();
  },
});

// Generate id dinamically
async function getNextSequence(name) {
  const result = await db
    .collection("counters")
    .findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnOriginal: false },
    );
  return result.value.current;
}

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
  const employees = await db.collection("employees").find(employee).toArray();
  return employees;
}

async function addEmployee(_, { employee }) {
  employeeValidate(employee);
  employee.id = await getNextSequence("employees");

  const result = await db.collection("employees").insertOne(employee);
  const savedEmployee = await db
    .collection("employees")
    .findOne({ _id: result.insertedId });
  return savedEmployee;
}

const resolvers = {
  Query: {
    employeeList,
  },
  Mutation: {
    addEmployee,
  },
  GraphQLDate,
};

// Initial commands to count employee documents and have the number of the next id
async function initDb() {
  const count = await db
    .collection("employees")
    .estimatedDocumentCount("employees");

  db.collection("counters").deleteOne({ _id: "employees" });
  db.collection("counters").insertOne({ _id: "employees", current: count });
}

async function connectToDb() {
  const client = new MongoClient(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log("Connected to MongoDB URL: ", dbUrl);
  db = client.db();
  initDb();
}

const server = new ApolloServer({
  typeDefs: fileSync.readFileSync("schema.graphql", "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const app = express();

const enableCors = (process.env.ENABLE_CORS || "true") === "true";

async function serverMiddleware() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql", cors: enableCors });
}
serverMiddleware();

const port = process.env.API_SERVER_PORT || 3000;

async function start() {
  try {
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
    await connectToDb();
  } catch (err) {
    console.log("ERROR:", err);
  }
}
start();
