import { TaskModel } from '../models/TaskModel';
import { User } from '../models/UserModel';
import { Request, Response } from 'express';

export const getTask = async (req: Request, res: Response) => {
  const tasks = await TaskModel.find();
  res.send(tasks);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.send(users);
};

export const getTasksByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;

  const tasks = await TaskModel.find({ user: id });
  res.send(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { task, email } = req.body;

  // Verificar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  TaskModel.create({ task, user: user._id })
    .then((data) => {
      console.log('Saved successfully...');
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log('Something went wrong');
      res.send(err);
    });
};

export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const { task, done } = req.body;

  TaskModel.findByIdAndUpdate(id, { task, done })
    .then(() => res.status(200).send('Updated successfully'))
    .catch((err) => {
      console.log('Something went wrong');
      res.send(err);
    });
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete(id)
    .then(() => res.send('Deleted successfully'))
    .catch((err) => {
      console.log('Something went wrong');
      res.send(err);
    });
};