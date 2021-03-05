import { db } from "~db";
import { ILoginService, IUserService } from "~backend/interfaces";
import { inject } from "inversify";
import { interfaces, controller, httpPost, } from "inversify-express-utils";
import { TOKENS } from "~backend/tokens";
import express from "express";
import { routes } from '~backend/routes';

@controller('')
export class UserController implements interfaces.Controller {

    constructor(
        @inject(TOKENS.UserService) private userService: IUserService,
        @inject(TOKENS.LoginService) private loginService: ILoginService
    ) { }

    @httpPost(routes["/users"])
    private async createUser(req: express.Request<Record<string, unknown>, Record<string, unknown>, db.user.Schema>, res: express.Response): Promise<db.user.Schema | undefined> {
        const user = await this.userService.createUser(req.body);
        await this.loginService.login(req, res);
        res.status(201);
        return user;
    }
}
