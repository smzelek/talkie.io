import { core } from "~core";
import { AsyncActionState } from "~frontend/utils";

export interface ChatroomSchema {
    chatrooms?: core.ChatroomWithInfo[];
    messages?: core.ChatroomMessage[];
    loading: AsyncActionState;
    loadingMessages: AsyncActionState;
    sendingMessage: AsyncActionState;
    creating: AsyncActionState;
    chatroomId?: string;
}

export const initialChatroomState: ChatroomSchema = {
    chatrooms: undefined,
    messages: undefined,
    loading: AsyncActionState.initialState,
    creating: AsyncActionState.initialState,
    loadingMessages: AsyncActionState.initialState,
    sendingMessage: AsyncActionState.initialState,
    chatroomId: undefined
};
