import * as features from './features';
import { mustHaveAllFeatureKeys } from './schemas';

export const actions = mustHaveAllFeatureKeys({
    login: features.loginActions,
    chatroom: features.chatroomActions
});
