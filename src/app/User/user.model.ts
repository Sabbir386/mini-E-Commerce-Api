import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    cancellationCount: {
      type: Number,
      default: 0,
    },

  },
  {
    timestamps: true,
  }
);

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});


export const User = model<IUser>("User", userSchema);
