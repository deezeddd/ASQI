import  { useState, useEffect } from "react";
import Department from "./Department";
import Employee from "./Employee";
import Table from "./Table";

interface EmployeeType {
  _id: string;
  name: string;
  department: string;
  address: string;
}

interface DepartmentType {
  _id: string;
  department: string;
}

export default function Home() {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch employees and departments from the backend
  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employees`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      setEmployees(data); 
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/departments`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch departments");
      }
      const data = await response.json();
      setDepartments(data.departments); 
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const addEmployee = (newEmployee: EmployeeType) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const addDepartment = (newDepartment: DepartmentType) => {
    setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
  };

  return (
    <div className="h-screen w-full grid grid-rows-2 gap-8 p-3">
      <div className="grid grid-cols-2 gap-8">
        <div className="w-full border-2 border-black">
          <Department onDepartmentAdd={addDepartment} />
        </div>
        <div className="w-full border-2 border-black">
          <Employee onEmployeeAdd={addEmployee} departments={departments} />
        </div>
      </div>

      <div className="w-full border-2 border-black p-2">
        <Table
          employees={employees}
          error={error}
          departments={departments}
        />
      </div>
    </div>
  );
}
