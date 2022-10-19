/**
 * @file imports mongoose schema for follows.
 */
import mongoose, {Schema} from "mongoose";
import Follows from "../models/Follows";
/**
  * @typedef FollowsScehma is how follows are represented.
  * @property {ObjectId} userid: primary keys of user following a user.
  */
const FollowsSchema = new mongoose.Schema<Follows>({
    followedBy:{type:Schema.Types.ObjectId, ref:"UserModel"},
    following:{type:Schema.Types.ObjectId, ref:"UserModel"},
},{collection:"follows"});
export default FollowsSchema;