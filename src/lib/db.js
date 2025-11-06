import mongoose from "mongoose";

export async function connectDB() {
   const uri = process.env.MONGO_URI;
   if (!uri) throw new Error("MONGO_URI missing in .env");

   // optional: verbose
   // mongoose.set("debug", true);

   await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      dbName: process.env.MONGO_DB || undefined,
   });

   console.log("✅ MongoDB connected");
}





















// import mongoose from "mongoose";

// // export const connectDB = async () => {
// //    try {
// //       const conn = await mongoose.connect(process.env.MONGO_URI);
// //       console.log(`MongoDB Connected: ${conn.connection.host}`);
// //    } catch (error) {
// //       console.log("Error in connecting to MongoDB", error);
// //       process.exit(1); // 1 means failure
// //    }
// // };
// import * as dotenv from "dotenv";
// dotenv.config();

// export const connectDB = async () => {
//    try {
//       const conn = await mongoose.connect(process.env.MONGO_URI, {
//          useNewUrlParser: true,
//          useUnifiedTopology: true,
//       });

//       console.log(`\n✅ MongoDB is Connected succesfully!!!`);
//    } catch (error) {
//       console.error("\n❌ MongoDB connection failed:");
//       process.exit(1);
//    }
// };
