import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {type: String, required: true},
    receiverId: {type: String, required: true},
    content: {type: String, required: true},
}, {timestamp: true})

export const Message = mongoose.model("Message", messageSchema);