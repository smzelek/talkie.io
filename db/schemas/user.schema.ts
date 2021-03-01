import * as mongoose from 'mongoose'

interface _Schema {
    username: string;
    name: string;
};

export interface Schema extends _Schema {
    _id?: string;
}

export interface Document extends _Schema, mongoose.Document { }

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100,
        lowercase: true,
        index: {
            unique: true
        }
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
});

export const model = mongoose.model<Document>("User", userSchema);