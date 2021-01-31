import { Db, MongoClient } from 'mongodb'

global.mongo = global.mongo || {}

export const connectToDB = async () => {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
    });
    console.log("connecting to DB");
    await global.mongo.client.connect();
    console.log("DB is now connected");
  }
  const db: Db = global.mongo.client.db("edc-schools");
  return { db, dbClient: global.mongo.client };
};
