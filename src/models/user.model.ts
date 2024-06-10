import mongoose from "mongoose";

export interface UserInteface {
  firstName: String,
  lastName: String,
  username: String,
  password: String
}

const userSchema = new mongoose.Schema<UserInteface>({
  firstName: String,
  lastName: String,
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

export async function storeUser(user: UserInteface) {
  await User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    password: user.password,
  });
}

export async function getAll() {
  return await User.find();
}

export async function getById(id: string) {
  return await User.findById(id);
}