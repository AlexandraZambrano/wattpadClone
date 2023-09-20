import mongoose from "mongoose"
import followSchema from "./follows.schema.js"
import Follow from "../Models/follow.model.js"
const { ObjectId } = mongoose.Schema.Types

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        uname: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user",
            enum: [ "user", "admin" ]
        },
        follows: [ { type: ObjectId, ref: Follow } ],
        date: {
            type: Date,
            default: Date.now
        },
    },

    { timestamps: true }
)

export default userSchema