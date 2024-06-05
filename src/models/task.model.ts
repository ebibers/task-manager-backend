import mongoose from "mongoose";

interface TaskInteface {
  title: String,
  description: String,
  type: String,
  createdOn: String | Date,
  status: Boolean
}

const taskSchema = new mongoose.Schema<TaskInteface>({
  title: String,
  description: String,
  type: String,
  createdOn: Date,
  status: Boolean
});

const Task = mongoose.model('Task', taskSchema);

export async function storeTask(task: TaskInteface) {
  await Task.create({
    title: task.title,
    description: task.description,
    type: task.type,
    createdOn: task.createdOn,
    status: task.status
  });
}