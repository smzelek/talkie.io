import * as mongoose from 'mongoose'
import * as user from "./user.schema";
import * as chatroom from "./chatroom.schema";

export interface Schema {
    content: string;
    user_sentby: user.Document['_id'];
    chatroom_sentto: chatroom.Document['_id'];
};

export interface Document extends Schema, mongoose.Document { }

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 1000
    },
    chatroom_sentto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chatroom',
        required: true
    },
    user_sentby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

export const model = mongoose.model<Document>("Message", messageSchema);

