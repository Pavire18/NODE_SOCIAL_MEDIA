import mongoose, { Document, ObjectId } from "mongoose";

const Schema = mongoose.Schema;

interface IFriendRequest  {
  sender: ObjectId;
  receiver: ObjectId;
  status: string;
}

const allowedStatus: string[] = ["Acepted", "Declined", "Pending"];

const friendRequestSchema = new Schema<IFriendRequest>(
  {
   sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
   },
   receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
   },
   status: {
    type: String,
    enum: allowedStatus,
    required: true
   }
  },
  {
    timestamps: true,
  }
);


export const FriendRequest = mongoose.model<IFriendRequest>("FriendRequest", friendRequestSchema);
export type friendRequestA = IFriendRequest & Document;
