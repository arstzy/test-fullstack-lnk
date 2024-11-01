import mongoose, { Document, Schema} from "mongoose";

export interface IEvent extends Document {
  email: string;
  date: Date;
  description: string;
  createdBy: string;
  createdAt: Date;
}

const EventSchema = new Schema({
  email: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId,required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IEvent>("Event", EventSchema);