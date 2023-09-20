import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    // Store the file path or URL to the chapter content
    content: { 
        type: String, required: true 
    },
    likes:[{type:ObjectId,ref:"User"}],

    comments: [
        {
          text: { type: String, required: true },
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
});

export default chapterSchema