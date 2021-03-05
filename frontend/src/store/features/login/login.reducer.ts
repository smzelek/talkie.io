import { initialLoginState, LoginSchema } from "./login.schema"
import { Reducer } from 'redux';
import { CHECK_LOGIN, CHECK_LOGIN_FAIL, CHECK_LOGIN_SUCCESS, LOGIN, LoginActions, LOGIN_FAIL, LOGIN_SUCCESS, SIGN_UP, SIGN_UP_FAIL, SIGN_UP_SUCCESS } from "./login.action";
import { AsyncActionState } from "~frontend/utils";

export const loginReducer: Reducer<LoginSchema> = (state: LoginSchema = initialLoginState, action: LoginActions): LoginSchema => {
    switch (action.type) {
        case CHECK_LOGIN: {
            return {
                ...state,
                checkingLogin: AsyncActionState.inProgressState
            };
        }
        case CHECK_LOGIN_SUCCESS: {
            return {
                ...state,
                checkingLogin: AsyncActionState.successState,
                currentUser: action.currentUser
            }
        }
        case CHECK_LOGIN_FAIL: {
            return {
                ...state,
                currentUser: undefined,
                checkingLogin: AsyncActionState.errorState(action.error)
            }
        }
        case SIGN_UP: {
            return {
                ...state,
                creatingUser: AsyncActionState.inProgressState
            };
        }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                creatingUser: AsyncActionState.successState,
                currentUser: action.currentUser
            };
        }
        case SIGN_UP_FAIL: {
            return {
                ...state,
                creatingUser: AsyncActionState.errorState(action.error)
            };
        }
        case LOGIN: {
            return {
                ...state,
                currentUser: undefined,
                loggingIn: AsyncActionState.inProgressState
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loggingIn: AsyncActionState.successState,
                currentUser: action.user
            };
        }
        case LOGIN_FAIL: {
            return {
                ...state,
                currentUser: undefined,
                loggingIn: AsyncActionState.errorState(action.error)
            };
        }
        default:
            return state;
    }
};
