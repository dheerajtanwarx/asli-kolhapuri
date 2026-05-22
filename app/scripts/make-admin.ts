// scripts/make-admin.ts
import mongoose from "mongoose";
import User from "@/models/User.model";

await mongoose.connect(process.env.MONGODB_URI!);
await User.updateOne(
  { email: "dheeraj@gmail.com" },
  { $set: { role: "admin" } }
);
console.log("Admin role assigned!");