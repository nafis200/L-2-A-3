import type { TUser, UserModel } from "./user-interface";
import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import config from "../../config";
const userSchema = new Schema<TUser,UserModel>(
  {
    _id:{type:String,required: false},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.brcypt_salt_rounds),
    );
    next();
  });
  
  userSchema.post('save', function (doc, next) {
    doc.password = ' ';
    next();
  });
  
  userSchema.statics.isUserExistsByCustomId = async function (email: string) {
    return await User.findOne({ email }).select('+password');
  };
  
  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };

export const User = model<TUser,UserModel>("User", userSchema);
