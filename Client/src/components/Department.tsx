import React, { useState } from "react";

interface DepartmentProps {
  onDepartmentAdd: (newDepartment: { _id: string; department: string }) => void;
}

export default function Department({ onDepartmentAdd }: DepartmentProps) {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/departments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department: departmentName,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add department");
      }

      const data = await response.json();
      alert("Department added");

      // Clearing form fields
      setDepartmentName("");
      setDescription("");

      
      onDepartmentAdd(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-2 h-full">
      <h2 className="text-lg font-semibold mb-4">Add Department</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex mt-4">
            <label htmlFor="department" className="text-sm mr-4 w-1/3">
              Dept Name
            </label>
            <input
              type="text"
              name="department"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="border-2 h-7 mb-5 w-72 p-3 text-sm "
              required
            />
          </div>
          <div className="flex">
            <label htmlFor="description" className="text-sm mr-4 w-1/3">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 h-7 w-72 p-3 text-sm mb-3"
              required
            />
          </div>
          <div className="align-bottom">
            <button
              type="submit"
              className="bg-green-500 border-2 text-white mt-4 text-sm p-2 rounded-md cursor-pointer"
            >
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
