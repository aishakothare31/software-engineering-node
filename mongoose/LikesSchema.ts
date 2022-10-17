import mongoose, { Schema } from "mongoose";
const LikesSchema = new mongoose.Schema({
   likedTuit: {type: Schema.Types.ObjectId, ref:"TuitModel"},
   likedBy: {type: Schema.Types.ObjectId, ref:"UserModel"}
}, {collection: 'likes'});
export default LikesSchema;