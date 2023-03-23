// Initial commands to count employee documents and have the number of the next id
async function initDb(db) {
  const count = await db
    .collection("employees")
    .estimatedDocumentCount("employees");

  db.collection("counters").deleteOne({ _id: "employees" });
  db.collection("counters").insertOne({ _id: "employees", current: count });
}

module.exports = { initDb };