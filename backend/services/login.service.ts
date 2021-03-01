import express from "express";
import { inject, injectable } from "inversify";
import * as db from '../../db';
import { APIError } from "../error";
import { TOKENS } from "../tokens";
import { UserService } from "./user.service";

export interface ILoginService {
    currentUser: (req: express.Request, res: express.Response) => Promise<db.user.Schema | undefined>;
    login: (req: express.Request<{}, {}, LoginRequest>, res: express.Response) => Promise<db.user.Schema | undefined>;
    logout: (req: express.Request, res: express.Response) => void;
}

export interface LoginRequest {
    username: db.user.Schema['username'];
}

@injectable()
export class LoginService implements ILoginService {
    private static COOKIE_NAME = 'talkieio_user';
    private static MINUTES_60_IN_MS = 60 * 60 * 1000;
    constructor(@inject(TOKENS.UserService) private userService: UserService) { }

    async currentUser(req: express.Request, res: express.Response): Promise<db.user.Schema | undefined> {
        const userCookie = req.cookies[LoginService.COOKIE_NAME];
        console.log(userCookie);
        if (!userCookie) {
            throw new APIError(401, 'User is not logged in.')
        }
        const userData = await this.userService.getUserById(userCookie);
        return userData;
    }

    async login(req: express.Request<{}, {}, LoginRequest>, res: express.Response): Promise<db.user.Schema | undefined> {
        console.log(req.body.username)
        const user = await this.userService.getUserByUsername(req.body.username);
        if (!user) {
            throw new APIError(403, 'User does not exist.')
        }
        this.loginWithCookie(res, user.id);
        return user;
    }

    logout(req: express.Request, res: express.Response): void {
        res.clearCookie(LoginService.COOKIE_NAME);
    }

    private loginWithCookie(res: express.Response, userId: db.user.Document['id']): void {
        res.cookie(LoginService.COOKIE_NAME, userId, {
            expires: new Date(Date.now() + LoginService.MINUTES_60_IN_MS),
            httpOnly: true
        });
    }
}