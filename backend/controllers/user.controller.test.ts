import { anything, instance, mock, when } from 'ts-mockito';
import { app, IOC } from '../main';
import { IDbService } from '../services/db.service';
import { Model } from 'mongoose';
import { resolvableInstance } from '../utils/resolvable-instance';
import { TOKENS } from '../tokens';
import * as db from '../../db';
import supertest from 'supertest';
import { APIError, ERROR_KEYS } from '../error';

describe('User Controller Tests', () => {
    let mockDbService: IDbService;
    let mockUserModel: Model<db.user.Document>;
    beforeEach(() => {
        mockDbService = mock<IDbService>();
        mockUserModel = mock<Model<db.user.Document>>();
        when(mockDbService.Users()).thenResolve(resolvableInstance(mockUserModel));

        IOC.rebind(TOKENS.DbService).toConstantValue(instance(mockDbService));
    });

    test('should return new user data when insert succeeds', async () => {
        const requestBody: db.user.Schema = { username: 'abc', name: 'test' };
        when(mockUserModel.create(anything())).thenResolve(requestBody as db.user.Document);
        const res = await supertest(app)
            .post('/users')
            .send(requestBody);
        expect(res.status).toBe(201);
        expect(res.body).toEqual(requestBody);
    });

    test('should return error when insert fails due to validation', async () => {
        const requestBody: db.user.Schema = { username: '', name: 'test' };
        const validationError: APIError = { name: ERROR_KEYS.ValidationError, code: 1, message: 'Reason for error.' };
        when(mockUserModel.create(anything())).thenReject(validationError);
        const res = await supertest(app)
            .post('/users')
            .send(requestBody);
        expect(res.status).toBe(422);
        expect(res.body).toEqual({ code: 422, message: validationError.message });
    });

    test('should return error when insert fails due to uniqueness', async () => {
        const uniquenessError: APIError = { name: ERROR_KEYS.MongoError, code: 11000, message: '' };
        when(mockUserModel.create(anything())).thenReject(uniquenessError);
        const res = await supertest(app)
            .post('/users')
            .send({});
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ code: 400, message: 'Username is already in use.' });
    });
})