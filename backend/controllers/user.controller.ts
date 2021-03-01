import * as express from "express";
import { interfaces, controller, httpGet, httpPost, } from "inversify-express-utils";
import { inject } from "inversify";
import { TOKENS } from "../tokens";
import { DbService } from "../services/db.service";
import * as db from '../../db';
import { APIError, ERROR_KEYS } from "../error";
// import { APIError, handleErrors } from "../error";

@controller("")
export class UserController implements interfaces.Controller {

    constructor(@inject(TOKENS.DbService) private dbService: DbService) { }

    @httpGet("/users")
    private async getAllUsers(req: express.Request, res: express.Response): Promise<db.user.Document[] | undefined> {
        const users = await this.dbService.Users();
        return users.find({});
    }

    @httpPost("/users")
    private async createUser(req: express.Request<{}, {}, db.user.Schema>, res: express.Response): Promise<db.user.Document | undefined> {
        const users = await this.dbService.Users();
        try {
            return await users.create<db.user.Schema>(req.body);
        } catch (err) {
            if (err.name === ERROR_KEYS.MongoError && err.code === 11000) {
                throw new APIError(400, 'Username is already in use.')
            } else {
                throw err;
            }
        }
    }
}
