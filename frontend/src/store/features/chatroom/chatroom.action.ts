import * as db from '../../../../../db';
import { APIError } from '../../../../../backend/error';
import { Dispatch } from 'redux';
import { RootSchema } from '../../schemas';
import { APIService } from '../../../services/api.service';
import { push } from 'react-router-redux';
import { ChatroomWithInfo } from '../../../../../core';

export const LOAD = '[Chatrooms] Load';
export const LOAD_SUCCESS = '[Chatrooms] Load Success';
export const LOAD_FAIL = '[Chatrooms] Load Fail';

export const CREATE = '[Chatroom] Create';
export const CREATE_SUCCESS = '[Chatroom] Create Success';
export const CREATE_FAIL = '[Chatroom] Create Fail';

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
}

interface CreateFail {
    type: typeof CREATE_FAIL,
    error: APIError
}

export type ChatroomActions =
    | Load
    | LoadSuccess
    | LoadFail
    | Create
    | CreateSuccess
    | CreateFail;

export const load$ = () => {
    return async (dispatch: Dispatch, state: RootSchema) => {
        dispatch(load());

        return APIService.getAllChatrooms()
            .then(
                (res) => {
                    dispatch(loadSuccess(res));
                },
                (err) => {
                    dispatch(loadFail(err));
                }
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

// export const login$ = (username: db.user.Schema['username']) => {
//     return async (dispatch: Dispatch, state: RootSchema) => {
//         dispatch(login());

//         return APIService.login(username)
//             .then(
//                 (res) => {
//                     dispatch(loginSuccess(res));
//                     dispatch(push('/chat'));
//                 },
//                 (err) => {
//                     dispatch(loginFail(err))
//                 }
//             );
//     };
// };

export const create = (name: db.chatroom.Schema['name']): ChatroomActions => {
    return {
        type: CREATE,
    }
};

export const createSuccess = (): ChatroomActions => {
    return {
        type: CREATE_SUCCESS,
    };
};

export const createFail = (error: APIError): ChatroomActions => {
    return {
        type: CREATE_FAIL,
        error
    };
};

export default {
    load$,
    load,
    loadSuccess,
    loadFail,
    create,
    createSuccess,
    createFail
}