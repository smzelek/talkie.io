import * as db from '../../../../../db';
import { APIError } from '../../../../../backend/error';
import { Dispatch } from 'redux';
import { RootSchema } from '../../schemas';
import { APIService } from '../../../services/api.service';

export const CHECK_LOGIN = '[Login] Check Login'
export const CHECK_LOGIN_SUCCESS = '[Login] Check Login Success';
export const CHECK_LOGIN_FAIL = '[Login] Check Login Fail';

export const LOGIN = '[Login] Login';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_FAIL = '[Login] Login Fail';

interface CheckLogin {
    type: typeof CHECK_LOGIN
};

interface CheckLoginSuccess {
    type: typeof CHECK_LOGIN_SUCCESS
    currentUser: db.user.Schema
}

interface CheckLoginFail {
    type: typeof CHECK_LOGIN_FAIL
    error: APIError;
};

interface Login {
    type: typeof LOGIN,
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS,
    user: db.user.Schema
}

interface LoginFail {
    type: typeof LOGIN_FAIL,
    error: APIError
}

export type LoginActions =
    | CheckLogin
    | CheckLoginSuccess
    | CheckLoginFail
    | Login
    | LoginSuccess
    | LoginFail;

export const checkLogin$ = () => {
    return async (dispatch: Dispatch, state: RootSchema) => {
        dispatch(checkLogin());

        return APIService.checkLogin()
            .then(
                (res) => dispatch(checkLoginSuccess(res)),
                (err) => dispatch(checkLoginFail(err))
            );
    };
};

export const checkLogin = (): LoginActions => {
    return {
        type: CHECK_LOGIN,
    }
};

export const checkLoginSuccess = (user: db.user.Schema): LoginActions => {
    return {
        type: CHECK_LOGIN_SUCCESS,
        currentUser: user
    }
};

export const checkLoginFail = (error: APIError): LoginActions => {
    return {
        type: CHECK_LOGIN_FAIL,
        error
    }
};

export const login$ = (username: db.user.Schema['username']) => {
    return async (dispatch: Dispatch, state: RootSchema) => {
        dispatch(login());

        return APIService.login(username)
            .then(
                (res) => dispatch(loginSuccess(res)),
                (err) => dispatch(loginFail(err))
            );
    };
};

export const login = (): LoginActions => {
    return {
        type: LOGIN,
    }
};

export const loginSuccess = (user: db.user.Schema): LoginActions => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

export const loginFail = (error: APIError): LoginActions => {
    return {
        type: LOGIN_FAIL,
        error
    };
};

export default {
    checkLogin$,
    checkLogin,
    checkLoginSuccess,
    checkLoginFail,
    login$,
    login,
    loginSuccess,
    loginFail
}