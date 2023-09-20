import mongoose from "mongoose";
import followSchema from "../schemas/follows.schema.js";

const Follow = mongoose.model('follows', followSchema);

export default Follow