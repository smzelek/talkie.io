import * as mongoose from 'mongoose'
import * as user from "./user.schema";

export interface _Schema {
    name: string;
    user_createdby: user.Document['_id'];
};
export interface Schema extends _Schema {
    id?: string;
}

export interface Document extends _Schema, mongoose.Document { }

const chatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    user_createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

export const model = mongoose.model<Document>("Chatroom", chatroomSchema);
