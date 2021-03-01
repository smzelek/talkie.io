import { anything, instance, mock, when } from 'ts-mockito';
import { app, IOC } from '../main';
import { TOKENS } from '../tokens';
import * as db from '../../db';
import supertest from 'supertest';
import { APIError, ERROR_KEYS } from '../error';
import { IUserService } from '../services';

describe('User Controller Tests', () => {
    let mockUserService: IUserService;

    beforeEach(() => {
        mockUserService = mock<IUserService>();
        IOC.rebind(TOKENS.UserService).toConstantValue(instance(mockUserService));
    });

    test('should return new user data when insert succeeds', async () => {
        const requestBody: db.user.Schema = { username: 'abc', name: 'test' };
        when(mockUserService.createUser(anything())).thenResolve(requestBody as db.user.Document);
        const res = await supertest(app)
            .post('/users')
            .send(requestBody);
        expect(res.status).toBe(201);
        expect(res.body).toEqual(requestBody);
    });

    test('should return error when create fails', async () => {
        const validationError: APIError = { name: ERROR_KEYS.ValidationError, code: 1, message: 'Reason for error.' };
        when(mockUserService.createUser(anything())).thenReject(validationError);

        const res = await supertest(app)
            .post('/users')
            .send({});
        expect(res.status).toBe(422);
        expect(res.body).toEqual({ code: 422, message: validationError.message });
    });
});
