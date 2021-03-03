import { anything, instance, mock, when } from 'ts-mockito';
import { Model } from 'mongoose';
import { db } from '~db';
import { IDbService, IUserService } from '~backend/interfaces';
import { IOC } from '~backend/main';
import { TOKENS } from '~backend/tokens';
import { resolvableInstance } from '~backend/utils';
import { core } from '~core';

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
        const validationError = { name: core.ERROR_KEYS.ValidationError, code: 1, message: 'Reason for error.' };
        when(mockUserModel.create(anything())).thenReject(validationError);

        await expect(userService.createUser({} as any))
            .rejects
            .toEqual(validationError);
    });

    test('should return error when insert fails due to uniqueness', async () => {
        const uniquenessError: core.APIError = { name: core.ERROR_KEYS.MongoError, code: 11000, message: '' };
        when(mockUserModel.create(anything())).thenReject(uniquenessError);

        await expect(userService.createUser({} as any))
            .rejects
            .toEqual(new core.APIError(400, 'Username is already in use.'));
    });
})