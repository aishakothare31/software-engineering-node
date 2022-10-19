/**
 * @file LikesModel implements the mongoose model to CRUD docs in likes collection.
 */
import mongoose from "mongoose";
import LikesSchema from "./LikesSchema";
const LikesModel = mongoose.model('LikesModel', LikesSchema);
export default LikesModel;