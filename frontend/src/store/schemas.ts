import { ChatroomSchema } from './features';
import { LoginSchema } from './features/login/login.schema';

type FeatureKeyObject = { [FEATURE in keyof RootSchema]: unknown }
export const mustHaveAllFeatureKeys = <T extends FeatureKeyObject>(t: T): T => t;

export interface RootSchema {
    login: LoginSchema;
    chatroom: ChatroomSchema;
}
