import { createSelector } from "reselect";
import { RootSchema } from "~frontend/store/schemas";

const chatroomState = (state: RootSchema) => state.chatroom;

const chatrooms = createSelector(chatroomState, (state) => state.chatrooms);
const loading = createSelector(chatroomState, (state) => state.loading);
const creating = createSelector(chatroomState, (state) => state.creating);
const loadingMessages = createSelector(chatroomState, (state) => state.loadingMessages);
const messages = createSelector(chatroomState, (state) => state.messages);
const chatroomId = createSelector(chatroomState, (state) => state.chatroomId);
const sendingMessage = createSelector(chatroomState, (state) => state.sendingMessage);

export const chatroomSelectors = {
    chatrooms,
    chatroomId,
    loading,
    creating,
    loadingMessages,
    messages,
    sendingMessage
}