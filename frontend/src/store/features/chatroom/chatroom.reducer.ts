import { Reducer } from 'redux';
import { AsyncActionState } from "../../utils/async-action-state";
import { ChatroomSchema, initialChatroomState } from "./chatroom.schema";
import { ChatroomActions, CREATE, CREATE_FAIL, CREATE_SUCCESS, LOAD, LOAD_FAIL, LOAD_SUCCESS } from './chatroom.action';

export const chatroomReducer: Reducer<ChatroomSchema> = (state: ChatroomSchema = initialChatroomState, action: ChatroomActions): ChatroomSchema => {
    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                loading: AsyncActionState.inProgressState
            };
        }
        case LOAD_SUCCESS: {
            return {
                ...state,
                loading: AsyncActionState.successState,
                chatrooms: action.chatrooms
            }
        }
        case LOAD_FAIL: {
            return {
                ...state,
                chatrooms: undefined,
                loading: AsyncActionState.errorState(action.error)
            }
        }
        case CREATE: {
            return {
                ...state,
                creating: AsyncActionState.inProgressState
            };
        }
        case CREATE_SUCCESS: {
            return {
                ...state,
                creating: AsyncActionState.successState,
            };
        }
        case CREATE_FAIL: {
            return {
                ...state,
                creating: AsyncActionState.errorState(action.error)
            };
        }
        default:
            return state;
    }
};
