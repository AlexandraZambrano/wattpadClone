import mongoose from "mongoose";
import bookSchema from "../schemas/book.schema.js";

const Book = mongoose.model('books', bookSchema);

export default Book