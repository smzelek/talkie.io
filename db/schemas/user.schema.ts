import {
    model,
    Schema,
    Document
} from "mongoose";

export interface IUser {
    username: string;
    name: string;
};

export interface UserDocument extends IUser, Document { }

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
});

export const User = model<UserDocument>("User", userSchema);
export const userFactory = (model: IUser) => new User(model);