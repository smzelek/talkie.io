import { combineReducers, Reducer, CombinedState, AnyAction } from 'redux';
import { FeatureKeys } from './feature-keys';
import * as features from './features';
import { connectRouter } from 'connected-react-router'
import { History } from 'history';

export const createRootReducer = (history: History<unknown>) => combineReducers({
    router: connectRouter(history),
    [FeatureKeys.login]: features.loginReducer,
    [FeatureKeys.chatroom]: features.chatroomReducer
});