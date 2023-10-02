import mongoose from "mongoose"
const uri = process.env.MONGO_URL;
await mongoose.connect(uri);