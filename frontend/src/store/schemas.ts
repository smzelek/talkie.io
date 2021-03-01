import { FeatureKeys } from './feature-keys';
import { ChatroomSchema } from './features/chatroom/chatroom.schema';
import { LoginSchema } from './features/login/login.schema';
export * from './features/login/login.schema';

export interface RootSchema {
    [FeatureKeys.login]: LoginSchema;
    [FeatureKeys.chatroom]: ChatroomSchema;
}
