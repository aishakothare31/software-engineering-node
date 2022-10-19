/**
 * @file imports mongoose schema for Likes.
 */
import mongoose, { Schema } from "mongoose";
/**
  * @typedef LikesSchema is how likes are represented.
  * @property {ObjectId} userid: primary key of user who liked tuit.
  * @property {ObjectId} tid: primary key of tuit liked.
*/
const LikesSchema = new mongoose.Schema({
   likedTuit: {type: Schema.Types.ObjectId, ref:"TuitModel"},
   likedBy: {type: Schema.Types.ObjectId, ref:"UserModel"}
}, {collection: 'likes'});
export default LikesSchema;