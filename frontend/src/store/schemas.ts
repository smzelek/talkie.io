import { FeatureKeys } from './feature-keys';
import { LoginSchema } from './features/login/login.schema';
export * from './features/login/login.schema';

export interface RootSchema {
    [FeatureKeys.login]: LoginSchema;
}
