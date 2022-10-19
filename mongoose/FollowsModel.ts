/**
 * @file FollowsModel implements the mongoose model to CRUD docs in follows collection.
 */
import mongoose from "mongoose";
import FollowsSchema from "./FollowsSchema";
const FollowsModel = mongoose.model("FollowsModel",FollowsSchema);
export default FollowsModel;