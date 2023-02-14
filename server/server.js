const fs = require("fs");
const express = require("express");
const { ApolloServer, UserInputError } = require("apollo-server-express");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://malena:123@advfsmalena.q9gdl6b.mongodb.net/?retryWrites=true&w=majority";

let db;

const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    employeeList,
  },
  Mutation: {
    addEmployee,
  },
  GraphQLDate,
};

async function employeeList(_, { employee }) {
  const employees = await db.collection("employees").find(employee).toArray();
  return employees;
}

// Generate id dinamically
async function getNextSequence(name) {
  const result = await db
    .collection("counters")
    .findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnOriginal: false }
    );
  return result.value.current;
}

function employeeValidate(employee) {
  const errors = [];
  if (employee.firstName.length < 2) {
    errors.push('Field "title" must be at least 2 characters long.');
  }
  if (employee.lastName.length < 2) {
    errors.push('Field "title" must be at least 2 characters long.');
  }
  if (employee.age < 20 || employee.age > 70) {
    errors.push('Field "age" must be between 20 and 70');
  }
  if (errors.length > 0) {
    throw new UserInputError("Invalid input(s)", { errors });
  }
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

async function initDb() {
  const count = await db
    .collection("employees")
    .estimatedDocumentCount("employees");

  db.collection("counters").deleteOne({ _id: "employees" });
  db.collection("counters").insertOne({ _id: "employees", current: count });
}

async function connectToDb() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log("Connected to MongoDB at", url);
  db = client.db();
  initDb();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./server/schema.graphql", "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static("public"));

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}
startServer();

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log("App started on port 3000");
    });
  } catch (err) {
    console.log("ERROR:", err);
  }
})();
