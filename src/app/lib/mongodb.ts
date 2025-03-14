import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
if (!uri) {
  throw new Error("⚠️ MONGODB_URI is not defined in environment variables.");
}

const options = {};

let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// ✅ Correctly extend `globalThis` to avoid TS7017
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// 🌍 Use `globalThis._mongoClientPromise` for persistence in dev mode
if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, options);
  globalThis._mongoClientPromise = client.connect();
}

// ✅ TypeScript-safe assignment
const clientPromise = globalThis._mongoClientPromise;

export default clientPromise;
