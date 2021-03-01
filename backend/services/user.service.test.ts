import { anything, instance, mock, when } from 'ts-mockito';
import { IOC } from '../main';
import { IDbService } from '../services/db.service';
import { Model } from 'mongoose';
import { resolvableInstance } from '../utils/resolvable-instance';
import { TOKENS } from '../tokens';
import * as db from '../../db';
import { APIError, ERROR_KEYS } from '../error';
import { IUserService } from './user.service';

describe('User Service Tests', () => {
    let mockDbService: IDbService;
    let mockUserModel: Model<db.user.Document>;
    let userService: IUserService;

    beforeEach(() => {
        mockDbService = mock<IDbService>();
        mockUserModel = mock<Model<db.user.Document>>();
        when(mockDbService.Users()).thenResolve(resolvableInstance(mockUserModel));

        IOC.rebind(TOKENS.DbService).toConstantValue(instance(mockDbService));
        userService = IOC.get(TOKENS.UserService);
    });

    test('should return new user data when insert succeeds', async () => {
        const user: db.user.Schema = { username: 'abc', name: 'test' };
        when(mockUserModel.create(anything())).thenResolve(user as db.user.Document);
        const result = await userService.createUser(user);
        expect(result).toEqual(user);
    });

    test('should return error when insert fails due to validation', async () => {
        const validationError = { name: ERROR_KEYS.ValidationError, code: 1, message: 'Reason for error.' };
        when(mockUserModel.create(anything())).thenReject(validationError);

        await expect(userService.createUser({} as any))
            .rejects
            .toEqual(validationError);
    });

    test('should return error when insert fails due to uniqueness', async () => {
        const uniquenessError: APIError = { name: ERROR_KEYS.MongoError, code: 11000, message: '' };
        when(mockUserModel.create(anything())).thenReject(uniquenessError);

        await expect(userService.createUser({} as any))
            .rejects
            .toEqual(new APIError(400, 'Username is already in use.'));
    });
})