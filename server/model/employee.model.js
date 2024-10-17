import mongoose from "mongoose";

const employee = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, ref: "department" },
  address: String,
});

export default mongoose.model("employee", employee);
