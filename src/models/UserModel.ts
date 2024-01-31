import { Schema, Types, model } from 'mongoose';

interface userType {
  email: string;
  tasks: Types.Array<Types.ObjectId>; // Arrays de Ids de tareas
}

const userSchema: Schema<userType> = new Schema({
  email: String,
  tasks: [{ type: Types.ObjectId, ref: 'Task' }], // Referencia al modelo Task
});

export const User = model('User', userSchema);