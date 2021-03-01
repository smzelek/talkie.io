import { combineReducers, Reducer, CombinedState, AnyAction } from 'redux';
import { FeatureKeys } from './feature-keys';
import * as features from './features';
import { RootSchema } from './schemas';

export const rootReducer: Reducer<CombinedState<RootSchema>, AnyAction> = combineReducers<RootSchema>({
    [FeatureKeys.login]: features.loginReducer
});
