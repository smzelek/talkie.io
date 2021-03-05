import { db } from '~db';
import { AsyncActionState } from '~frontend/utils';

export interface LoginSchema {
    currentUser?: db.user.Schema;
    checkingLogin: AsyncActionState;
    creatingUser: AsyncActionState;
    loggingIn: AsyncActionState;
    loggingOut: AsyncActionState;
}

export const initialLoginState: LoginSchema = {
    currentUser: undefined,
    checkingLogin: AsyncActionState.initialState,
    creatingUser: AsyncActionState.initialState,
    loggingIn: AsyncActionState.initialState,
    loggingOut: AsyncActionState.initialState
};
