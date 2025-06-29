import mongoose from "mongoose";

// MongoDB connection strings with the specified credentials
const ATLAS_URI =
  "mongodb+srv://alshaercontact:12345678Samtax@cluster0.k44ex3a.mongodb.net/alshaer?retryWrites=true&w=majority";
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
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 5000, // 5 second timeout
    };

    // In production/build environment, prioritize Atlas
    const isProduction =
      process.env.NODE_ENV === "production" ||
      process.env.VERCEL ||
      process.env.RENDER;
    const primaryURI = isProduction ? ATLAS_URI : LOCAL_URI;
    const fallbackURI = isProduction ? LOCAL_URI : ATLAS_URI;

    // Try to connect to the primary MongoDB first
    cached.promise = mongoose
      .connect(primaryURI, opts)
      .then((mongoose) => {
        console.log(
          `Connected to ${isProduction ? "MongoDB Atlas" : "local MongoDB"}`
        );
        return mongoose;
      })
      .catch((primaryErr) => {
        console.warn(
          `${isProduction ? "Atlas" : "Local"} MongoDB connection failed, trying ${isProduction ? "local" : "Atlas"}:`,
          primaryErr.message
        );

        // If primary connection fails, try fallback
        return mongoose
          .connect(fallbackURI, opts)
          .then((mongoose) => {
            console.log(
              `Connected to ${isProduction ? "local MongoDB" : "MongoDB Atlas"}`
            );
            // Update the URI for future connections
            MONGODB_URI = fallbackURI;
            return mongoose;
          })
          .catch((fallbackErr) => {
            console.error("Both MongoDB connections failed:");
            console.error(
              `${isProduction ? "Atlas" : "Local"} error:`,
              primaryErr.message
            );
            console.error(
              `${isProduction ? "Local" : "Atlas"} error:`,
              fallbackErr.message
            );

            // During build time, we might not have database access
            if (
              process.env.NODE_ENV === "production" &&
              process.env.NEXT_PHASE === "phase-production-build"
            ) {
              console.warn(
                "Database connection failed during build - this is expected for static generation"
              );
              throw new Error("Database not available during build");
            }

            throw fallbackErr;
          });
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
