import mongoose from 'mongoose';

// Retrieve the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'your-default-mongodb-uri';

// Throw an error if the URI is not defined
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Extend the global object to include the mongoose cache
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Initialize the cache object
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<mongoose.Connection> {
  // If a connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection exists, create a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Prevent Mongoose from buffering commands when not connected
    };

    // Store the promise for the connection
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose.connection);
  }

  // Await the connection promise and store the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

