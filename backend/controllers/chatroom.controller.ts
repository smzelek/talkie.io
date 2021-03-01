import * as express from "express";
import { interfaces, controller, httpPost, httpGet, } from "inversify-express-utils";
import { inject } from "inversify";
import { TOKENS } from "../tokens";
import * as db from '../../db';
import { ChatroomService } from "../services";
import { GetAllChatroomsResponse } from '../../core';

@controller("/chatrooms")
export class ChatroomController implements interfaces.Controller {

    constructor(@inject(TOKENS.ChatroomService) private chatroomService: ChatroomService) { }

    @httpGet("/")
    private async getAll(req: express.Request<{}, {}, db.user.Schema>, res: express.Response): Promise<GetAllChatroomsResponse | undefined> {
        const chatrooms = await this.chatroomService.getAll();
        res.status(200);
        return chatrooms;
    }
}
