import express from "express";
import { inject, injectable } from "inversify";
import { db } from '~db';
import { core } from "~core";
import { ILoginService, IUserService } from "~backend/interfaces";
import { TOKENS } from "~backend/tokens";

@injectable()
export class LoginService implements ILoginService {
    private static COOKIE_NAME = 'talkieio_user';
    private static MINUTES_60_IN_MS = 60 * 60 * 1000;
    constructor(@inject(TOKENS.UserService) private userService: IUserService) { }

    async currentUser(req: express.Request, res: express.Response): Promise<db.user.Schema | undefined> {
        const userCookie = req.cookies[LoginService.COOKIE_NAME];
        if (!userCookie) {
            throw new core.APIError(401, 'User is not logged in.')
        }
        const userData = await this.userService.getUserById(userCookie);
        if (!userData) {
            throw new core.APIError(403, 'User does not exist.')
        }
        return userData;
    }

    async login(req: express.Request<{}, {}, core.LoginRequest>, res: express.Response): Promise<db.user.Schema | undefined> {
        const user = await this.userService.getUserByUsername(req.body.username);
        if (!user) {
            throw new core.APIError(403, 'User does not exist.')
        }
        this.loginWithCookie(res, user._id);
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