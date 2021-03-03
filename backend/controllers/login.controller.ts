import express from "express";
import { interfaces, controller, httpPost, httpGet, httpDelete, } from "inversify-express-utils";
import { inject } from "inversify";
import { ILoginService } from "~backend/interfaces";
import { TOKENS } from "~backend/tokens";
import { db } from "~db";
import { core } from '~core';
import { routes } from '~backend/routes';

@controller('')
export class LoginController implements interfaces.Controller {

    constructor(@inject(TOKENS.LoginService) private loginService: ILoginService) { }

    @httpGet(routes["/login"])
    private async currentUser(req: express.Request, res: express.Response): Promise<db.user.Schema | undefined> {
        const user = await this.loginService.currentUser(req, res);
        return user;
    }

    @httpPost(routes["/login"])
    private async login(req: express.Request<{}, {}, core.LoginRequest>, res: express.Response) {
        const user = await this.loginService.login(req, res);
        res.status(200);
        return user;
    }

    @httpDelete(routes["/login"])
    private logout(req: express.Request, res: express.Response) {
        this.loginService.logout(req, res);
        return {
            code: 200
        };
    }
}
