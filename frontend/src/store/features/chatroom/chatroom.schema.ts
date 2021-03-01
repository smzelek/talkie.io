import { AsyncActionState } from "../../utils/async-action-state";
import * as db from '../../../../../db';
import { ChatroomWithInfo } from '../../../../../core';

export interface ChatroomSchema {
    chatrooms?: ChatroomWithInfo[];
    loading: AsyncActionState;
    creating: AsyncActionState;
}

export const initialChatroomState: ChatroomSchema = {
    chatrooms: undefined,
    loading: AsyncActionState.initialState,
    creating: AsyncActionState.initialState,
};
