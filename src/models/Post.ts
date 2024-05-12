import mongoose, { Document, ObjectId } from "mongoose";

const Schema = mongoose.Schema;

interface IPost  {
  publisher: ObjectId,
  text: string,
  images: string[],
  likes: number,
  group?: ObjectId
}

const postSchema = new Schema<IPost>(
  {
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    text: {
      type: String,
      minLength: [3, "Al menos 3 letras para el contenido."],
      maxLength: [50, "Máximo 50 letras para el contenido."],
      required: true,
    },
    images: [{
      type: String,
      required: true
    }],
    likes: {
      type: Number,
      default: 0,
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: false
    }
  },
  {
    timestamps: true,
  }
);


export const Post = mongoose.model<IPost>("FriendRequest", postSchema);
export type postA = IPost & Document;