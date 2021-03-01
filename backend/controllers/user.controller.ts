import * as express from "express";
import { interfaces, controller, httpPost, } from "inversify-express-utils";
import { inject } from "inversify";
import { TOKENS } from "../tokens";
import * as db from '../../db';
import { LoginService, UserService } from "../services";

@controller("/users")
export class UserController implements interfaces.Controller {

    constructor(
        @inject(TOKENS.UserService) private userService: UserService,
        @inject(TOKENS.LoginService) private loginService: LoginService
    ) { }

    @httpPost("/")
    private async createUser(req: express.Request<{}, {}, db.user.Schema>, res: express.Response): Promise<db.user.Schema | undefined> {
        const user = await this.userService.createUser(req.body);
        await this.loginService.login(req, res);
        res.status(201);
        return user;
    }
}
