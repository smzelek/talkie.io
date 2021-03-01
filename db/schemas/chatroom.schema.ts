import {
    model as _model,
    Schema,
    Document
} from "mongoose";
import { document as userDocument } from "./user.schema";

export interface schema {
    name: string;
    user_createdby: document['_id'];
};

export interface document extends schema, Document { }

const chatroomSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    user_createdby: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

export const model = _model<document>("Chatroom", chatroomSchema);
