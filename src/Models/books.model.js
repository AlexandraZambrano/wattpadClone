import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {type:String, required: true},
        description: {type:String, required: true},
        genre: {type:String, required: true},
        cover: {type:String, required: true},
        createdAt: {type:Date, default: Date.now}
    }
)

const Book = mongoose.model('books', bookSchema);

export default Book