// import "reflect-metadata";
import * as express from "express";
import { interfaces, controller, httpGet, } from "inversify-express-utils";
import { inject } from "inversify";
import { TOKENS } from "../tokens";
import { DbService } from "../services/db.service";
import * as db from '../../db';

@controller("")
export class UserController implements interfaces.Controller {

    constructor(@inject(TOKENS.DbService) private dbService: DbService) { }

    @httpGet("/users")
    private async getAll(req: express.Request, res: express.Response): Promise<db.user.document[] | undefined> {
        try {
            const users = await this.dbService.users();
            return users.find({});
        } catch (error) {
            res.status(500).send({ error: { code: 500, message: error } });
            return;
        }
    }
}
