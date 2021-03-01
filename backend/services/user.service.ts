import { inject, injectable } from "inversify";
import * as db from '../../db';
import { APIError, ERROR_KEYS } from "../error";
import { TOKENS } from "../tokens";
import { DbService } from "./db.service";

export interface IUserService {
    createUser: (user: db.user.Schema) => Promise<db.user.Schema | undefined>;
    getUserById: (userId: db.user.Document['id']) => Promise<db.user.Schema | undefined>;
}

@injectable()
export class UserService implements IUserService {
    constructor(@inject(TOKENS.DbService) private dbService: DbService) { }

    async createUser(user: db.user.Schema): Promise<db.user.Schema | undefined> {
        try {
            const User = await this.dbService.Users();
            const newUser = await User.create(user);
            return UserService.documentToSchema(newUser);
        } catch (err) {
            if (err.name === ERROR_KEYS.MongoError && err.code === 11000) {
                throw new APIError(400, 'Username is already in use.')
            } else {
                throw err;
            }
        }
    }

    async getUserById(userId: db.user.Document['id']): Promise<db.user.Schema | undefined> {
        const User = await this.dbService.Users();
        const user = await User.findById(userId);
        if (!user) {
            return undefined;
        }

        return UserService.documentToSchema(user);
    }

    async getUserByUsername(username: db.user.Schema['username']): Promise<db.user.Schema | undefined> {
        const User = await this.dbService.Users();
        const user = await User.findOne({ username } as db.user.Schema);
        if (!user) {
            return undefined;
        }

        return UserService.documentToSchema(user);
    }

    static documentToSchema(document: db.user.Document): db.user.Schema {
        return {
            id: document.id,
            username: document.username,
            name: document.name
        };
    }
}