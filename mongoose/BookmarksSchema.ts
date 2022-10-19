/**
 * @file imports mongoose schema for bookmarks.
 */
import mongoose,{Schema} from "mongoose";
import Bookmarks from "../models/Bookmarks";
/**
  * @typedef BookmarksSchema is how bookmarks are represented.
  * @property {ObjectId} userid: primary key of user who bookmarked tuit
  * @property {ObjectId} tid: primary key of tuit bookmarked.
  */
const BookmarksSchema = new mongoose.Schema<Bookmarks>({
    bookmarkedTuit:{type:Schema.Types.ObjectId,ref:"TuitModel"},
    bookmarkedBy:{type:Schema.Types.ObjectId,ref:"UserModel"},
},{collection:"bookmarks"});

export default BookmarksSchema;