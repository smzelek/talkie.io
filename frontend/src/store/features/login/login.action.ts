import { Dispatch } from 'redux';
import { push } from 'react-router-redux';
import { db } from '~db';
import { APIService } from '~frontend/services';
import { core } from '~core';

export const CHECK_LOGIN = '[Login] Check Login'
export const CHECK_LOGIN_SUCCESS = '[Login] Check Login Success';
export const CHECK_LOGIN_FAIL = '[Login] Check Login Fail';

export const SIGN_UP = '[Login] Sign Up';
export const SIGN_UP_SUCCESS = '[Login] Sign Up Success';
export const SIGN_UP_FAIL = '[Login] Sign Up Fail';

export const LOGIN = '[Login] Login';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_FAIL = '[Login] Login Fail';

export const LOGOUT = '[Login] Logout';
export const LOGOUT_SUCCESS = '[Login] Logout';
export const LOGOUT_FAIL = '[Login] Logout';

interface CheckLogin {
    type: typeof CHECK_LOGIN
}

interface CheckLoginSuccess {
    type: typeof CHECK_LOGIN_SUCCESS
    currentUser: db.user.Schema
}

interface CheckLoginFail {
    type: typeof CHECK_LOGIN_FAIL
    error: core.APIError;
}

interface SignUp {
    type: typeof SIGN_UP
}

interface SignUpSuccess {
    type: typeof SIGN_UP_SUCCESS,
    currentUser: db.user.Schema
}

interface SignUpFail {
    type: typeof SIGN_UP_FAIL,
    error: core.APIError
}

interface Login {
    type: typeof LOGIN,
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS,
    user: db.user.Schema
}

interface LoginFail {
    type: typeof LOGIN_FAIL,
    error: core.APIError
}

interface Logout {
    type: typeof LOGOUT;
}

interface LogoutSuccess {
    type: typeof LOGOUT_SUCCESS;
}

interface LogoutFail {
    type: typeof LOGOUT_FAIL;
    error: core.APIError;
}

const checkLogin$ = (ifLoggedInFn: () => void = () => ({}), ifLoggedOutFn: () => void = () => ({})) => {
    return (dispatch: Dispatch): Promise<void> => {
        dispatch(checkLogin());

        return APIService.checkLogin()
            .then(
                (res) => {
                    dispatch(checkLoginSuccess(res))
                    ifLoggedInFn();
                },
                (err) => {
                    dispatch(checkLoginFail(err))
                    ifLoggedOutFn();
                }
            );
    };
};

const checkLogin = (): LoginActions => {
    return {
        type: CHECK_LOGIN,
    }
};

const checkLoginSuccess = (user: db.user.Schema): LoginActions => {
    return {
        type: CHECK_LOGIN_SUCCESS,
        currentUser: user
    }
};

const checkLoginFail = (error: core.APIError): LoginActions => {
    return {
        type: CHECK_LOGIN_FAIL,
        error
    }
};

const signUp$ = (username: db.user.Schema['username'], name: db.user.Schema['name']) => {
    return (dispatch: Dispatch): Promise<void> => {
        dispatch(signUp());

        return APIService.signUp(username, name)
            .then(
                (res) => {
                    dispatch(signUpSuccess(res));
                    dispatch(push('/chat'));
                },
                (err) => {
                    dispatch(signUpFail(err))
                }
            );
    };
};

const signUp = (): LoginActions => {
    return {
        type: SIGN_UP
    };
};

const signUpSuccess = (currentUser: db.user.Schema): LoginActions => {
    return {
        type: SIGN_UP_SUCCESS,
        currentUser
    };
};

const signUpFail = (error: core.APIError): LoginActions => {
    return {
        type: SIGN_UP_FAIL,
        error
    };
};

const login$ = (username: db.user.Schema['username']) => {
    return (dispatch: Dispatch): Promise<void> => {
        dispatch(login());

        return APIService.login(username)
            .then(
                (res) => {
                    dispatch(loginSuccess(res));
                    dispatch(push('/chat'));
                },
                (err) => {
                    dispatch(loginFail(err))
                }
            );
    };
};

const login = (): LoginActions => {
    return {
        type: LOGIN,
    }
};

const loginSuccess = (user: db.user.Schema): LoginActions => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginFail = (error: core.APIError): LoginActions => {
    return {
        type: LOGIN_FAIL,
        error
    };
};

const logout$ = () => {
    return (dispatch: Dispatch): Promise<void> => {
        dispatch(logout());

        return APIService.logout()
            .then(
                () => {
                    dispatch(logoutSuccess());
                    dispatch(push('/login'));
                },
                (err) => {
                    dispatch(logoutFail(err))
                }
            );
    };
};


const logout = (): LoginActions => {
    return {
        type: LOGOUT,
    }
};

const logoutSuccess = (): LoginActions => {
    return {
        type: LOGOUT_SUCCESS,
    };
};

const logoutFail = (error: core.APIError): LoginActions => {
    return {
        type: LOGOUT_FAIL,
        error
    };
};

export type LoginActions =
    | CheckLogin
    | CheckLoginSuccess
    | CheckLoginFail
    | Login
    | LoginSuccess
    | LoginFail
    | Logout
    | LogoutSuccess
    | LogoutFail
    | SignUp
    | SignUpSuccess
    | SignUpFail;

export const loginActions = {
    checkLogin$,
    checkLogin,
    checkLoginSuccess,
    checkLoginFail,
    signUp$,
    signUp,
    signUpSuccess,
    signUpFail,
    login$,
    login,
    loginSuccess,
    loginFail,
    logout$,
    logout,
    logoutSuccess,
    logoutFail
};
