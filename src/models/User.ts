import validator from "validator";
import bcrypt from "bcrypt";
import mongoose, { CallbackError, Document, ObjectId, Schema }  from "mongoose";

export interface IUser  {
  email: string;
  password: string;
  name: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  friends: ObjectId[];
}
const allowedGeders: string[] = ["Mujer", "Hombre", "Personalizado"];


const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => {
          return validator.isEmail(value);
        },
        message: 'Email incorrecto',
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minLength: [3, "Al menos 3 letras para el nombre."],
      maxLength: [20, "Máximo 20 letras para el nombre."],
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      minLength: [3, "Al menos 3 letras para el nombre."],
      maxLength: [20, "Máximo 20 letras para el nombre."],
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: allowedGeders,
      trim: true,
    },
    birthDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value: Date) => value instanceof Date,
        message: 'Fecha de nacimiento incorrecto',
      },
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    // Si la contraseña ya estaba encriptada, no la encriptamos de nuevo
    if (this.isModified("password")) {
      const saltRounds = 10;
      const passwordEncrypted = await bcrypt.hash(this.password, saltRounds);
      this.password = passwordEncrypted;
    }

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

export const User = mongoose.model<IUser>("User", userSchema);
// Juntar las dos 'iterfaces', document te permite sacar los _id para el seeds.
export type userA = IUser & Document;
