import * as features from './features';
import { mustHaveAllFeatureKeys } from './schemas';

export const selectors = mustHaveAllFeatureKeys({
    login: features.loginSelectors,
    chatroom: features.chatroomSelectors
});
