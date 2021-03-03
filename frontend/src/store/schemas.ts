import { ChatroomSchema } from './features';
import { LoginSchema } from './features/login/login.schema';

type FeatureKeyObject = { [FEATURE in keyof RootSchema]: any }
export const mustHaveAllFeatureKeys = <T extends FeatureKeyObject>(t: T) => t;

export interface RootSchema {
    login: LoginSchema;
    chatroom: ChatroomSchema;
}
