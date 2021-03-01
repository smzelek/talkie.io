import {
    model as _model,
    Schema,
    Document
} from "mongoose";

export interface schema {
    username: string;
    name: string;
};

export interface document extends schema, Document { }

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

export const model = _model<document>("User", userSchema);