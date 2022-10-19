/**
 * @file MessagesModel implements the mongoose model to CRUD docs in messages collection.
 */
import mongoose from "mongoose";
import MessagesSchema from "./MessagesScehma";
const MessagesModel = mongoose.model('MessagesModel', MessagesSchema);
export default MessagesModel;