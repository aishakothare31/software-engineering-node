import mongoose from "mongoose";
import MessagesSchema from "./MessagesScehma";
const MessagesModel = mongoose.model('MessagesModel', MessagesSchema);
export default MessagesModel;