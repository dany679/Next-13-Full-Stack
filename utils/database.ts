import mongoose from "mongoose";

let isConnected = false;
async function connectDB() {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  // Use new db connection
  try {
    console.log("Connecting");
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: "promtopia",
    });
    isConnected = true;
    console.log("Connected to MongoDB **********************");
  } catch (error) {
    console.log("error Connected to MongoDB error");
    console.log(error);
  }
}

export default connectDB;
