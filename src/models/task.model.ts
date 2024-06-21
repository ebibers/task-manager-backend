import mongoose from "mongoose";

export interface TaskInterface {
  title: String,
  description: String,
  type: String,
  createdOn: String | Date,
  status: Boolean,
  assignedTo: String
}

const taskSchema = new mongoose.Schema<TaskInterface>({
  title: String,
  description: String,
  type: String,
  createdOn: Date,
  status: Boolean,
  assignedTo: String
});

const Task = mongoose.model('Task', taskSchema);

export async function storeTask(task: TaskInterface) {
  await Task.create({
    title: task.title,
    description: task.description,
    type: task.type,
    createdOn: task.createdOn,
    status: task.status,
    assignedTo: task.assignedTo
  });
}

export async function getAll() {
  return await Task.find();
}

export async function removeTask(id: string) {
  await Task.deleteOne({_id: id});
}

export async function getById(id: string) {
  return await Task.findById(id);
}

export async function updateTask(id: string, task: TaskInterface) {
  const taskData = await getById(id);

  if (taskData) {
    taskData.title = task.title;
    taskData.description = task.description;
    taskData.type = task.type;
    taskData.createdOn = task.createdOn;
    taskData.status = task.status;
    taskData.assignedTo = task.assignedTo;

    await taskData.save();
  }
}