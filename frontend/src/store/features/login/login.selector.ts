import { createSelector } from "reselect";
import { RootSchema } from "../../schemas";

const loginState = (state: RootSchema) => state.login;

const creatingUser = createSelector(loginState, (state) => state.creatingUser);
const checkingLogin = createSelector(loginState, (state) => state.checkingLogin);
const loggingIn = createSelector(loginState, (state) => state.loggingIn);
const currentUser = createSelector(loginState, (state) => state.currentUser);
const loggingOut = createSelector(loginState, (state) => state.loggingOut);

export default {
    creatingUser,
    checkingLogin,
    loggingIn,
    currentUser,
    loggingOut
}