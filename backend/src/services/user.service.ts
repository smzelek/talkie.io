import { inject, injectable } from "inversify";
import { db } from "~db";
import { IDbService, IUserService } from "~backend/interfaces";
import { TOKENS } from "~backend/tokens";
import { core } from "~core";

@injectable()
export class UserService implements IUserService {
    constructor(@inject(TOKENS.DbService) private dbService: IDbService) { }

    async createUser(user: db.user.Schema): Promise<db.user.Schema | undefined> {
        try {
            const User = await this.dbService.Users();
            const newUser = await User.create(user);
            return UserService.documentToSchema(newUser);
        } catch (err) {
            if (err.name === core.ERROR_KEYS.MongoError && err.code === 11000) {
                throw new core.APIError(400, 'Username is already in use.')
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
            _id: document._id,
            username: document.username,
            name: document.name
        };
    }
}