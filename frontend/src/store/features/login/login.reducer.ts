import { initialLoginState, LoginSchema } from "./login.schema"
import { Reducer } from 'redux';
import { AsyncActionState } from "../../utils/async-action-state";
import { CHECK_LOGIN, CHECK_LOGIN_FAIL, CHECK_LOGIN_SUCCESS, LOGIN, LoginActions, LOGIN_FAIL, LOGIN_SUCCESS } from "./login.action";

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
