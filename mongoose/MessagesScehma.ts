/**
 * @file imports mongoose schema for Messages.
 */
import mongoose, { Schema } from "mongoose";
/**
 * @typedef MessagesSchema is how messages are represented.
 * @property {ObjectId} userid: primary keys of sender and receiver
 */
const MessagesSchema = new mongoose.Schema({
   sender: {type: Schema.Types.ObjectId, ref:"UserModel"},
   receiver: {type: Schema.Types.ObjectId, ref:"UserModel"},
   message: {type: String},
   sentOn:{type: Date, default: Date.now}
}, {collection: 'message'});
export default MessagesSchema;