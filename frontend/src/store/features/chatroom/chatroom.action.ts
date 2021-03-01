import * as db from '../../../../../db';
import { APIError } from '../../../../../backend/error';
import { Dispatch } from 'redux';
import { RootSchema } from '../../schemas';
import { APIService } from '../../../services/api.service';
import { ChatroomMessage, ChatroomWithInfo } from '../../../../../core';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';

export const LOAD = '[Chatrooms] Load';
export const LOAD_SUCCESS = '[Chatrooms] Load Success';
export const LOAD_FAIL = '[Chatrooms] Load Fail';

export const CREATE = '[Chatroom] Create';
export const CREATE_SUCCESS = '[Chatroom] Create Success';
export const CREATE_FAIL = '[Chatroom] Create Fail';

export const LOAD_RECENT_MESSAGES = '[Chatrooms] Load Recent Messages';
export const LOAD_RECENT_MESSAGES_SUCCESS = '[Chatrooms] Load Recent Messages Success';
export const LOAD_RECENT_MESSAGES_FAIL = '[Chatrooms] Load Recent Messages Fail';

export const SEND_MESSAGE = '[Chatrooms] Send Message';
export const SEND_MESSAGE_SUCCESS = '[Chatrooms] Send Message Success';
export const SEND_MESSAGE_FAIL = '[Chatrooms] Send Message Fail';

interface Load {
    type: typeof LOAD
};

interface LoadSuccess {
    type: typeof LOAD_SUCCESS
    chatrooms: ChatroomWithInfo[]
}

interface LoadFail {
    type: typeof LOAD_FAIL
    error: APIError;
};

interface Create {
    type: typeof CREATE,
}

interface CreateSuccess {
    type: typeof CREATE_SUCCESS,
    chatroom: db.chatroom.Schema
}

interface CreateFail {
    type: typeof CREATE_FAIL,
    error: APIError
}

interface LoadRecentMessages {
    type: typeof LOAD_RECENT_MESSAGES,
    id: db.chatroom.Schema['_id']
};

interface LoadRecentMessagesSuccess {
    type: typeof LOAD_RECENT_MESSAGES_SUCCESS,
    messages: ChatroomMessage[]
};

interface LoadRecentMessagesFail {
    type: typeof LOAD_RECENT_MESSAGES_FAIL,
    error: APIError
};

interface SendMessage {
    type: typeof SEND_MESSAGE
};

interface SendMessageSuccess {
    type: typeof SEND_MESSAGE_SUCCESS,
    message: db.message.Schema
};

interface SendMessageFail {
    type: typeof SEND_MESSAGE_FAIL,
    error: APIError
};


export type ChatroomActions =
    | Load
    | LoadSuccess
    | LoadFail
    | Create
    | CreateSuccess
    | CreateFail
    | LoadRecentMessages
    | LoadRecentMessagesSuccess
    | LoadRecentMessagesFail
    | SendMessage
    | SendMessageSuccess
    | SendMessageFail;

export const load$ = () => {
    return (dispatch: Dispatch, getState: () => RootSchema) => {
        dispatch(load());

        return APIService.getAllChatrooms()
            .then(
                (res) => dispatch(loadSuccess(res)),
                (err) => dispatch(loadFail(err))
            );
    };
};

export const load = (): ChatroomActions => {
    return {
        type: LOAD,
    }
};

export const loadSuccess = (chatrooms: ChatroomWithInfo[]): ChatroomActions => {
    return {
        type: LOAD_SUCCESS,
        chatrooms
    }
};

export const loadFail = (error: APIError): ChatroomActions => {
    return {
        type: LOAD_FAIL,
        error
    }
};

export const create$ = (name: db.chatroom.Schema['name']) => {
    return (dispatch: ThunkDispatch<RootSchema, {}, any>, getState: () => RootSchema) => {
        dispatch(create());

        return APIService.createRoom(name)
            .then(
                (res) => {
                    dispatch(createSuccess(res));
                    dispatch(load$());
                    dispatch(push(`/chat/${res._id}`))
                },
                (err) => dispatch(createFail(err))
            );
    };
}

export const create = (): ChatroomActions => {
    return {
        type: CREATE,
    }
};

export const createSuccess = (chatroom: db.chatroom.Schema): ChatroomActions => {
    return {
        type: CREATE_SUCCESS,
        chatroom
    };
};

export const createFail = (error: APIError): ChatroomActions => {
    return {
        type: CREATE_FAIL,
        error
    };
};

export const loadRecentMessages$ = (id: db.chatroom.Schema['_id']) => {
    return (dispatch: Dispatch, getState: () => RootSchema) => {
        dispatch(loadRecentMessages(id));

        return APIService.getRecentMessagesForChatroom(id)
            .then(
                (res) => {
                    return dispatch(loadRecentMessagesSuccess(res));
                },
                (err) => {
                    return dispatch(loadRecentMessagesFail(err));
                }
            );
    };
};

export const loadRecentMessages = (id: db.chatroom.Schema['_id']): ChatroomActions => {
    return {
        type: LOAD_RECENT_MESSAGES,
        id
    }
};

export const loadRecentMessagesSuccess = (messages: ChatroomMessage[]): ChatroomActions => {
    return {
        type: LOAD_RECENT_MESSAGES_SUCCESS,
        messages
    }
};

export const loadRecentMessagesFail = (error: APIError): ChatroomActions => {
    return {
        type: LOAD_RECENT_MESSAGES_FAIL,
        error
    }
};

export const sendMessage$ = (chatroom_sentto: db.chatroom.Schema['_id'], content: db.message.Schema['content']) => {
    return (dispatch: ThunkDispatch<RootSchema, {}, any>, getState: () => RootSchema) => {
        dispatch(sendMessage());

        return APIService.sendMessage(chatroom_sentto, content)
            .then(
                (res) => {
                    dispatch(loadRecentMessages$(chatroom_sentto));
                    dispatch(load$());
                    dispatch(sendMessageSuccess(res));
                },
                (err) => {
                    dispatch(sendMessageFail(err));
                }
            );
    };
};

export const sendMessage = (): ChatroomActions => {
    return {
        type: SEND_MESSAGE
    }
};

export const sendMessageSuccess = (message: db.message.Schema): ChatroomActions => {
    return {
        type: SEND_MESSAGE_SUCCESS,
        message
    }
};

export const sendMessageFail = (error: APIError): ChatroomActions => {
    return {
        type: SEND_MESSAGE_FAIL,
        error
    }
};


export default {
    load$,
    load,
    loadSuccess,
    loadFail,
    create$,
    create,
    createSuccess,
    createFail,
    loadRecentMessages$,
    loadRecentMessages,
    loadRecentMessagesSuccess,
    loadRecentMessagesFail,
    sendMessage$,
    sendMessage,
    sendMessageSuccess,
    sendMessageFail
}