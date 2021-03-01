import 'reflect-metadata';
import cors from 'cors';
import './controllers';
import { Container } from "inversify";
import { TOKENS } from "./tokens";
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';
import { APIError, toApiError } from './error';
import express from 'express';
import { ChatroomService, DbService, IChatroomService, IDbService, ILoginService, IUserService, LoginService, UserService } from './services';
import cookies from 'cookie-parser';

const IOC = new Container();
IOC.bind<IDbService>(TOKENS.DbService).to(DbService).inSingletonScope();
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
    const apiError = toApiError(err);
    res.status(apiError.code).send(APIError.toResponse(apiError));
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`);
    });
}

export { app, IOC };