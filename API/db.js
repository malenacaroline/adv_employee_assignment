require("dotenv").config();
const { MongoClient } = require('mongodb');

let db;

// Initial commands to count employee documents and have the number of the next id
async function initDb() {
  const count = await db
    .collection("employees")
    .estimatedDocumentCount("employees");

  db.collection("counters").deleteOne({ _id: "employees" });
  db.collection("counters").insertOne({ _id: "employees", current: count });
}

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

async function connectToDb() {
  const dbUrl = process.env.DB_URL || "mongodb+srv://malena:123@advfsmalena.q9gdl6b.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await client.connect();
  console.log("Connected to MongoDB URL: ", dbUrl);
  db = client.db();
  initDb();
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };