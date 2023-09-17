import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    // Store the file path or URL to the chapter content
    content: { type: String, required: true },
});

export default chapterSchema