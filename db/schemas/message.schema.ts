import {
    model as _model,
    Schema,
    Document
} from "mongoose";
import { document as chatroomDocument } from "./chatroom.schema";
import { document as userDocument } from "./user.schema";

export interface schema {
    content: string;
    user_sentby: userDocument['_id'];
    chatroom_sentto: chatroomDocument['_id'];
};

export interface document extends schema, Document { }

const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 1000
    },
    chatroom_sentto: {
        type: Schema.Types.ObjectId,
        ref: 'Chatroom',
        required: true
    },
    user_sentby: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

export const model = _model<document>("Message", messageSchema);

