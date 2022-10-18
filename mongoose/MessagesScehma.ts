import mongoose, { Schema } from "mongoose";
const MessagesSchema = new mongoose.Schema({
   sender: {type: Schema.Types.ObjectId, ref:"UserModel"},
   receiver: {type: Schema.Types.ObjectId, ref:"UserModel"},
   message: {type: String}
}, {collection: 'message'});
export default MessagesSchema;