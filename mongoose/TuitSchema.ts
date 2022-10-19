/**
 * @file imports mongoose schema for tuits
 */
import mongoose, { Schema } from "mongoose";
import User from "../models/User";
/**
 * @typedef TuitSchema is how tuits are represented.
 * @property {ObjectId} userid: primary key of user
 */
const TuitSchema = new mongoose.Schema({
   tuit: {type: String, required: true},
   postedOn: {type: Date, default: Date.now},
   postedBy: {type: Schema.Types.ObjectId, ref:"UserModel"}
}, {collection: 'tuits'});
export default TuitSchema;