import mongoose from "mongoose";
import chapterSchema from "../schemas/chapter.schema.js";

const Chapter = mongoose.model('chapters', chapterSchema)
export default Chapter
