import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { core } from '~core';
import { db } from '~db';
import { RootSchema } from '~frontend/store/schemas';
import { APIService } from '~frontend/services';

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
    chatrooms: core.ChatroomWithInfo[]
}

interface LoadFail {
    type: typeof LOAD_FAIL
    error: core.APIError;
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
    error: core.APIError
}

interface LoadRecentMessages {
    type: typeof LOAD_RECENT_MESSAGES,
    id: db.chatroom.Schema['_id']
};

interface LoadRecentMessagesSuccess {
    type: typeof LOAD_RECENT_MESSAGES_SUCCESS,
    messages: core.ChatroomMessage[]
};

interface LoadRecentMessagesFail {
    type: typeof LOAD_RECENT_MESSAGES_FAIL,
    error: core.APIError
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
    error: core.APIError
};

const load$ = () => {
    return (dispatch: Dispatch, getState: () => RootSchema) => {
        dispatch(load());

        return APIService.getAllChatrooms()
            .then(
                (res) => dispatch(loadSuccess(res)),
                (err) => dispatch(loadFail(err))
            );
    };
};

const load = (): ChatroomActions => {
    return {
        type: LOAD,
    }
};

const loadSuccess = (chatrooms: core.ChatroomWithInfo[]): ChatroomActions => {
    return {
        type: LOAD_SUCCESS,
        chatrooms
    }
};

const loadFail = (error: core.APIError): ChatroomActions => {
    return {
        type: LOAD_FAIL,
        error
    }
};

const create$ = (name: db.chatroom.Schema['name']) => {
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

const create = (): ChatroomActions => {
    return {
        type: CREATE,
    }
};

const createSuccess = (chatroom: db.chatroom.Schema): ChatroomActions => {
    return {
        type: CREATE_SUCCESS,
        chatroom
    };
};

const createFail = (error: core.APIError): ChatroomActions => {
    return {
        type: CREATE_FAIL,
        error
    };
};

const loadRecentMessages$ = (id: db.chatroom.Schema['_id']) => {
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

const loadRecentMessages = (id: db.chatroom.Schema['_id']): ChatroomActions => {
    return {
        type: LOAD_RECENT_MESSAGES,
        id
    }
};

const loadRecentMessagesSuccess = (messages: core.ChatroomMessage[]): ChatroomActions => {
    return {
        type: LOAD_RECENT_MESSAGES_SUCCESS,
        messages
    }
};

const loadRecentMessagesFail = (error: core.APIError): ChatroomActions => {
    return {
        type: LOAD_RECENT_MESSAGES_FAIL,
        error
    }
};

const sendMessage$ = (chatroom_sentto: db.chatroom.Schema['_id'], content: db.message.Schema['content']) => {
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

const sendMessage = (): ChatroomActions => {
    return {
        type: SEND_MESSAGE
    }
};

const sendMessageSuccess = (message: db.message.Schema): ChatroomActions => {
    return {
        type: SEND_MESSAGE_SUCCESS,
        message
    }
};

const sendMessageFail = (error: core.APIError): ChatroomActions => {
    return {
        type: SEND_MESSAGE_FAIL,
        error
    }
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

export const chatroomActions = {
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
};
