import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String
    }
});

export const user = mongoose.model("User", userSchema);