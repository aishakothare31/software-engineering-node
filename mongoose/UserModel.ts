/**
 * @file Usermodel implements the mongoose model to CRUD docs in users collection.
 */
import mongoose from "mongoose";
import UserSchema from "./UserSchema";
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;

