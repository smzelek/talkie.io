import 'reflect-metadata';
import './controllers';
import { ChatroomService, MongoDbService, LoginService, UserService } from './services';
import { Container } from "inversify";
import { IChatroomService, IDbService, ILoginService, IUserService } from './interfaces';
import { InversifyExpressServer } from 'inversify-express-utils';
import { TOKENS } from "./tokens";
import bodyParser from 'body-parser';
import cookies from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { core } from '~core';

const IOC = new Container();
IOC.bind<IDbService>(TOKENS.DbService).to(MongoDbService).inSingletonScope();
IOC.bind<IUserService>(TOKENS.UserService).to(UserService);
IOC.bind<ILoginService>(TOKENS.LoginService).to(LoginService);
IOC.bind<IChatroomService>(TOKENS.ChatroomService).to(ChatroomService);

const PORT = Number(process.env.PORT) || 8000;

const server = new InversifyExpressServer(IOC);
server.setConfig((app) => {
    app.use(cors({
        origin: "http://localhost:8080",
        credentials: true,
    }));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cookies());
});

const app = server.build();
app.use(function (err: Error, _: any, res: express.Response, __: any) {
    if (process.env.NODE_ENV !== 'test') {
        console.error(err.stack);
    }
    const apiError = core.APIError.fromError(err);
    res.status(apiError.code).send(core.APIError.toResponse(apiError));
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`);
    });
}

export { app, IOC };