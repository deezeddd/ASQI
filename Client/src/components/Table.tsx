import React, { useState } from "react";

interface Employee {
  _id: string;
  name: string;
  department: string;
  address: string;
}

interface Department {
  _id: string;
  department: string;
}

interface TableProps {
  employees: Employee[];
  error: string;
  departments: Department[]; 
}

export default function Table({
  employees,
  error,
  departments,
}: TableProps) {
  const [filterName, setFilterName] = useState<string>("");
  const [filterDepartment, setFilterDepartment] = useState<string>("");

  // Handle filtering
  const filteredEmployees = employees.filter((employee) => {
    const matchesName = employee.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchesDepartment = filterDepartment
      ? employee.department === filterDepartment
      : true; // Match department if selected
    return matchesName && matchesDepartment; 
  });

  return (
    <div className="p-2 h-full">
      <h2 className="text-lg font-semibold mb-4">Employee Details</h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="border-2 p-2 w-48 h-10 rounded-md mr-2 text-sm"
        />
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="border-2 p-2 rounded-md w-48 h-10 text-sm"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept.department}>
              {dept.department}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Department</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {employee._id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.department}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.address}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
