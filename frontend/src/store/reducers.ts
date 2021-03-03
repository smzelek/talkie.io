import { combineReducers, } from 'redux';
import { connectRouter } from 'connected-react-router'
import { History } from 'history';
import * as features from './features';
import { mustHaveAllFeatureKeys } from './schemas';

export const createRootReducer = (history: History<unknown>) => combineReducers({
    router: connectRouter(history),
    ...mustHaveAllFeatureKeys({
        login: features.loginReducer,
        chatroom: features.chatroomReducer
    })
});
