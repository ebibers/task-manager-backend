import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt-ts";

export interface UserInterface {
  firstName: string,
  lastName: string,
  username: string,
  password: string
}

const userSchema = new mongoose.Schema<UserInterface>({
  firstName: String,
  lastName: String,
  username: {type: String, unique: true},
  password: String
});

const User = mongoose.model('User', userSchema);

export async function storeUser(user: UserInterface) {
  const salt = await genSalt(10);

  const hashedPassword = await hash(user.password, salt);

  await User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    password: hashedPassword,
  });
}

export async function getAll() {
  return await User.find();
}

export async function getById(id: string) {
  return await User.findById(id);
}

export async function getByUsername(username: string) {
  return await User.findOne({username: username});
}