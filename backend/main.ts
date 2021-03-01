import 'reflect-metadata';
import cors from 'cors';
import './controllers/user.controller';
import { Container } from "inversify";
import { TOKENS } from "./tokens";
import { IDbService, DbService } from "./services/db.service";
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';
import { toApiError } from './error';
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
    console.error(err.stack);
    const apiError = toApiError(err);
    res.status(apiError.code).send(apiError.toResponse());
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`);
});
