import mongoose from "mongoose";
import { user } from './user.model';

const connection = "mongodb://mongodb:27017";
export const connectDb = () => {
    return mongoose.connect(connection);
};
