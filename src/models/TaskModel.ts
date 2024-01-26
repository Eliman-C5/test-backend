import mongoose, { Schema, Types } from 'mongoose';

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User', // Referencia al modelo User
    required: true,
  },
});

export const TaskModel = mongoose.model('Task', taskSchema);
