import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt-ts";

export interface UserInterface {
  roles: string[],
  firstName: string,
  lastName: string,
  username: string,
  password: string
}

const userSchema = new mongoose.Schema<UserInterface>({
  roles: [String],
  firstName: String,
  lastName: String,
  username: {type: String, unique: true},
  password: String
});

const User = mongoose.model('User', userSchema);

export async function storeUser(user: UserInterface) {
  const salt = await genSalt(10);

  const hashedPassword = await hash(user.password, salt);

  return await User.create({
    roles: user.roles,
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

export async function updateUser(id: string, user: UserInterface) {
  const userData = await getById(id);

  if (userData) {
    userData.username = user.username;
    userData.roles = user.roles;
    userData.firstName = user.firstName;
    userData.lastName = user.lastName;
    userData.password = user.password;

    await userData.save();
  }
}