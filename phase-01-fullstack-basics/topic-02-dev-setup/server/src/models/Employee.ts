import { Schema, model } from "mongoose";

interface IEmployee {
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
}

const employeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Employee = model<IEmployee>("Employee", employeeSchema);
