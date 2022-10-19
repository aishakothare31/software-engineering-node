/**
 * @file TuitModel implements the mongoose model to CRUD docs in tuits collection.
 */
import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";
const TuitModel = mongoose.model('TuitModel', TuitSchema);
export default TuitModel;