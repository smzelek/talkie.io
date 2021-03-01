import * as express from "express";
import { interfaces, controller, httpPost, httpGet, httpDelete, } from "inversify-express-utils";
import { inject } from "inversify";
import { TOKENS } from "../tokens";
import * as db from '../../db';
import { LoginRequest, LoginService } from "../services";

@controller("/login")
export class LoginController implements interfaces.Controller {

    constructor(@inject(TOKENS.LoginService) private loginService: LoginService) { }

    @httpGet("/")
    private async currentUser(req: express.Request, res: express.Response): Promise<db.user.Schema | undefined> {
        const user = await this.loginService.currentUser(req, res);
        return user;
    }

    @httpPost("/")
    private async login(req: express.Request<{}, {}, LoginRequest>, res: express.Response) {
        await this.loginService.login(req, res);
        return {
            code: 200
        };
    }

    @httpDelete("/")
    private logout(req: express.Request, res: express.Response) {
        this.loginService.logout(req, res);
        return {
            code: 200
        };
    }
}
