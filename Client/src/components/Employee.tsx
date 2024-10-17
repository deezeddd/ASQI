import React, { useState } from "react";

interface Department {
  _id: string;
  department: string;
}

interface EmployeeProps {
  onEmployeeAdd: (newEmployee: {
    _id: string;
    name: string;
    department: string;
    address: string;
  }) => void;
  departments: Department[];
}

export default function Employee({
  onEmployeeAdd,
  departments,
}: EmployeeProps) {
  const [name, setName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employees`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            department,
            address,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const data = await response.json();
      alert("Employee added");

      // Clearing form fields 
      setName("");
      setDepartment("");
      setAddress("");

      onEmployeeAdd(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-2 h-full">
      <h2 className="text-lg font-semibold mb-4">Add Employee</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex mt-2">
            <label htmlFor="name" className="text-sm mr-2 w-1/3">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 h-7 mb-5 w-72 p-3 text-sm rounded-md"
              required
            />
          </div>
          <div className="flex mt-2">
            <label htmlFor="department" className="text-sm mr-2 w-1/3">
              Department
            </label>
            <select
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border-2 h-10 w-72 mb-2 text-sm p-2 rounded-md"
              required
            >
              <option value="">Select</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.department}>
                  {dept.department}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-2">
            <label htmlFor="address" className="text-sm mr-2 w-1/3">
              Address
            </label>
            <textarea
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-2 h-7 mb-3 w-72 pl-2 pt-1 text-sm rounded-md"
              required
            />
          </div>
          <div className="align-bottom">
            <button
              type="submit"
              className="bg-green-500 border-2 text-white mt-3 text-sm p-2 rounded-md cursor-pointer"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
