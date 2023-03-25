require("dotenv").config();
const { MongoClient } = require('mongodb');
const { initDb } = require('./scripts/init_db');

let db;

// Generate id dinamically
async function getNextSequence(name) {
  const result = await db
    .collection(name).findOne({}, { sort: { _id: -1 }, limit: 1 });
  return result.id + 1;
}

async function connectToDb() {
  const dbUrl = process.env.DB_URL || "mongodb+srv://malena:123@advfsmalena.q9gdl6b.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log("Connected to MongoDB URL: ", dbUrl);
  db = client.db();
  initDb(db);
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };
