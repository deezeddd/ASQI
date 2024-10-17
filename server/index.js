import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Employee from "./model/employee.model.js";
import Department from "./model/department.model.js";
import connectDB from './connection.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
})
// Add Department
app.post("/departments", async (req, res) => {
    try{
        const { department, description } = req.body;
        const newDepartment = new Department({ department, description });
        const dept = await newDepartment.save();
        res.status(201).send(dept);
    }
    catch(err){
        res.status(400).send(err)
    }   

});
//All deps
app.get("/departments", async (req, res) => {
    const departments = await Department.find();
    res.send({departments});
})

// Add Employee
app.post("/employees", async (req, res) => {
    try{
        const { name, department, address } = req.body;
        const newEmployee = new Employee({ name, department, address });
        const emp = await newEmployee.save();
        res.status(201).send(emp);
    }
    catch(err){
        res.send(err)
    }

});

// Get Employees
app.get("/employees", async (req, res) => {
    try{
        const employees = await Employee.find()
        res.send(employees);
    }
    catch (err){
        res.send(err)
    }

});

app.listen(PORT, () => {
  console.log("Server running on port 4000");
});
