import mongoose from "mongoose";

export interface RefreshTokenInterface {
  token: string
}

const tokenSchema = new mongoose.Schema<RefreshTokenInterface>({
  token: { type: String, unique: true }
});

const Token = mongoose.model('Token', tokenSchema);

export async function storeToken(token: string) {
  await Token.create({
    token: token
  });
}

export async function findToken(token: string) {
  return await Token.findOne({ token: token });
}

export async function deleteToken(token: string) {
  await Token.deleteOne({ token: token });
}