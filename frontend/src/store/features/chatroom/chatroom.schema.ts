import { ChatroomMessage, ChatroomWithInfo } from '../../../../../core';
import { AsyncActionState } from "../../../utils/async-action-state";

export interface ChatroomSchema {
    chatrooms?: ChatroomWithInfo[];
    messages?: ChatroomMessage[];
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
