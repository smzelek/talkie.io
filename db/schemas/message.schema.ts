import {
    model,
    Schema,
    Document
} from "mongoose";
import { ChatroomDocument } from "./chatroom.schema";
import { UserDocument } from "./user.schema";

export interface IMessage {
    content: string;
    user_sentby: UserDocument['_id'];
    chatroom_sentto: ChatroomDocument['_id'];
};

export interface MessageDocument extends IMessage, Document { }

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

export const Message = model<MessageDocument>("Message", messageSchema);
export const messageFactory = (model: IMessage) => new Message(model);

