const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require("mongodb");

let database = null;

async function startDatabase() {

  const mongod = new MongoMemoryServer();
  await mongod.start();
  const mongoDBURL = mongod.getUri();
  const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};
