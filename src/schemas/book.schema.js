import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types
import chapterSchema from "../schemas/chapter.schema.js";


const bookSchema = mongoose.Schema(
    {
        title: {type:String, required: true},
        description: {type:String, required: true},
        genre: {
            type: String,
            required: true,
            enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Fantasy', 'Romance', 'Thriller', 'Other']
        },
        cover: {type:String, required: true},
        createdAt: {type:Date, default: Date.now},
        chapters: [chapterSchema],
        likes:[{type:ObjectId,ref:"User"}],
        postedBy:{
            type:ObjectId,
            ref:"User",
            required: true
         }
    }
)

export default bookSchema