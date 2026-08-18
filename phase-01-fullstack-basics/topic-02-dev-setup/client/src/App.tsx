import { useEffect, useState } from "react";
import "./App.css";

interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
}

const API_URL = "http://localhost:5000/api/employees";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        position: form.get("position"),
        department: form.get("department"),
        salary: Number(form.get("salary")),
      }),
    });

    e.currentTarget.reset();
    fetchEmployees();
  };

  return (
    <div className="app">
      <h1>Employees</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="position" placeholder="Position" required />
        <input name="department" placeholder="Department" required />
        <input name="salary" type="number" placeholder="Salary" required />
        <button type="submit">Add Employee</button>
      </form>

      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.name} — {emp.position}, {emp.department} — ₹{emp.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
