import { Reducer } from 'redux';
import { AsyncActionState } from "../../../utils/async-action-state";
import { ChatroomSchema, initialChatroomState } from "./chatroom.schema";
import { ChatroomActions, CREATE, CREATE_FAIL, CREATE_SUCCESS, LOAD, LOAD_FAIL, LOAD_RECENT_MESSAGES, LOAD_RECENT_MESSAGES_FAIL, LOAD_RECENT_MESSAGES_SUCCESS, LOAD_SUCCESS, SEND_MESSAGE, SEND_MESSAGE_FAIL, SEND_MESSAGE_SUCCESS } from './chatroom.action';

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
        case LOAD_RECENT_MESSAGES: {
            return {
                ...state,
                loadingMessages: AsyncActionState.inProgressState,
                messages: undefined,
                chatroomId: action.id
            };
        }
        case LOAD_RECENT_MESSAGES_SUCCESS: {
            return {
                ...state,
                loadingMessages: AsyncActionState.successState,
                messages: action.messages
            };
        }
        case LOAD_RECENT_MESSAGES_FAIL: {
            return {
                ...state,
                loadingMessages: AsyncActionState.errorState(action.error),
                messages: undefined
            };
        }
        case SEND_MESSAGE: {
            return {
                ...state,
                sendingMessage: AsyncActionState.inProgressState,
            };
        }
        case SEND_MESSAGE_SUCCESS: {
            return {
                ...state,
                sendingMessage: AsyncActionState.successState,
            };
        }
        case SEND_MESSAGE_FAIL: {
            return {
                ...state,
                sendingMessage: AsyncActionState.errorState(action.error),
            };
        }
        default:
            return state;
    }
};
