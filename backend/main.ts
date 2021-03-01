import 'reflect-metadata';
import cors from 'cors';
import './controllers/user.controller';
import { Container } from "inversify";
import { TOKENS } from "./tokens";
import { IDbService, DbService } from "./services/db.service";
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';
import { APIError, toApiError } from './error';
import express from 'express';

const IOC = new Container();
IOC.bind<IDbService>(TOKENS.DbService).to(DbService).inSingletonScope();

const PORT = Number(process.env.PORT) || 8000;

const server = new InversifyExpressServer(IOC);
server.setConfig((app) => {
    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

const app = server.build();
app.use(function (err: Error, _: any, res: express.Response, __: any) {
    if (process.env.NODE_ENV !== 'test') {
        console.error(err.stack);
    }
    const apiError = toApiError(err);
    res.status(apiError.code).send(APIError.toResponse(apiError));
});

app.listen(PORT, '0.0.0.0', () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`);
    }
});

export { app, IOC };