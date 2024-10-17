import mongoose from "mongoose";

const department = new mongoose.Schema({
  department: { type: String, required: true },
  description: String,
});

export default mongoose.model("department", department);
