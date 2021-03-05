import { ThunkDispatch } from "redux-thunk";
import { RootSchema } from "~frontend/store";

export interface ThunkDispatchProp {
    dispatch: ThunkDispatch<RootSchema, unknown, any>;
}