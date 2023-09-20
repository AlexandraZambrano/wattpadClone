import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types


const followSchema = new mongoose.Schema({
    followers: [{type:ObjectId,ref:"User"}],
    following: [{type:ObjectId,ref:"User"}],

});

export default followSchema
