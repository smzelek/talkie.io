import { inject, injectable } from "inversify";
import { GetAllChatroomsResponse } from "../../core";
import * as db from '../../db';
import { TOKENS } from "../tokens";
import { DbService } from "./db.service";

export interface IChatroomService {
    getAll: () => Promise<GetAllChatroomsResponse | undefined>;
}

@injectable()
export class ChatroomService implements IChatroomService {
    constructor(@inject(TOKENS.DbService) private dbService: DbService) { }

    async getAll(): Promise<GetAllChatroomsResponse | undefined> {
        const Chatroom = await this.dbService.Chatrooms();
        const chatrooms = await Chatroom.find({}).populate('user_createdby');

        return chatrooms;
    }
}