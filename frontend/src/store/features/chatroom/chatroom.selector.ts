import { createSelector } from "reselect";
import { LoginSchema, RootSchema } from "../../schemas";

const chatroomState = (state: RootSchema) => state.chatroom;

const chatrooms = createSelector(chatroomState, (state) => state.chatrooms);
const loading = createSelector(chatroomState, (state) => state.loading);
const creating = createSelector(chatroomState, (state) => state.creating);

export default {
    chatrooms,
    loading,
    creating,
}