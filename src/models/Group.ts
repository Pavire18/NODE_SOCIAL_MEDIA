import mongoose, { Document, ObjectId } from "mongoose";

const Schema = mongoose.Schema;

interface IGroup  {
  admin: ObjectId;
  title: string;
  image: string;
  members: ObjectId[];
}

const allowedStatus: string[] = ["Acepted", "Declined", "Pending"];

const groupSchema = new Schema<IGroup>(
  {
   admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
   },
   title: {
    type: String,
    minLength: [3, "Al menos 3 letras para el titulo."],
    maxLength: [20, "Máximo 20 letras para el titulo."],
    trim: true,
    required: true
   },
   image: {
    type: String,
    required: true
   },
   members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
   }]

  },
  {
    timestamps: true,
  }
);


export const Group = mongoose.model<IGroup>("Group", groupSchema);
export type groupA = IGroup & Document;