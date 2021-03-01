import mongoose from "mongoose";
// import { user } from './user.model';

const connection = "mongodb://mongodb:27017/talkieio";
export const connectDb = () => {
    return mongoose.connect(connection);
};
