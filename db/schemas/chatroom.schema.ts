import {
    model,
    Schema,
    Document
} from "mongoose";
import { UserDocument } from "./user.schema";

export interface IChatroom {
    name: string;
    user_createdby: UserDocument['_id'];
};

export interface ChatroomDocument extends IChatroom, Document { }

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

export const Chatroom = model<ChatroomDocument>("Chatroom", chatroomSchema);
export const chatroomFactory = (model: IChatroom) => new Chatroom(model);
