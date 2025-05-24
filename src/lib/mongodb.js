import mongoose from "mongoose";

// MongoDB connection strings with the specified credentials
const ATLAS_URI =
  "mongodb+srv://b19r:12345678@alshaer.m6fqcnd.mongodb.net/?retryWrites=true&w=majority&appName=alshaer";
const LOCAL_URI = "mongodb://127.0.0.1:27017/alshaer";

// We'll use the local URI by default, but will fall back to Atlas if local fails
let MONGODB_URI = LOCAL_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Try to connect to the local MongoDB first
    cached.promise = mongoose
      .connect(LOCAL_URI, opts)
      .then((mongoose) => {
        console.log("Connected to local MongoDB");
        return mongoose;
      })
      .catch((localErr) => {
        console.warn(
          "Local MongoDB connection failed, trying Atlas:",
          localErr.message
        );

        // If local connection fails, try Atlas
        return mongoose
          .connect(ATLAS_URI, opts)
          .then((mongoose) => {
            console.log("Connected to MongoDB Atlas");
            // Update the URI for future connections
            MONGODB_URI = ATLAS_URI;
            return mongoose;
          })
          .catch((atlasErr) => {
            console.error("Both MongoDB connections failed:");
            console.error("Local error:", localErr.message);
            console.error("Atlas error:", atlasErr.message);
            throw atlasErr;
          });
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
