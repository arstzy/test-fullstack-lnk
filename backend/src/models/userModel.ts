import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  registerTimeStamps: Date;
  loginTimeStamps?: Date;
  logoutTimeStamps?: Date;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registerTimeStamps: { type: Date, default: Date.now },
  loginTimeStamps: { type: Date },
  logoutTimeStamps: { type: Date },
});

export default mongoose.model<IUser>("User", UserSchema);