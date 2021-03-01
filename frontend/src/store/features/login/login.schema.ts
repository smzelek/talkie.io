import { AsyncActionState } from "../../utils/async-action-state";
import * as db from '../../../../../db';

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
