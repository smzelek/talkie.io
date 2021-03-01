import * as express from "express";
import { interfaces, controller, httpGet, requestParam, response, httpPost, } from "inversify-express-utils";
import { inject } from "inversify";
import { TOKENS } from "../tokens";
import * as db from '../../db';
import { ChatroomService } from "../services";
import { GetAllChatrooms, GetLatestMessagesForChatroom, NewMessageRequest, NewRoomRequest } from '../../core'

@controller("/chatrooms")
export class ChatroomController implements interfaces.Controller {

    constructor(@inject(TOKENS.ChatroomService) private chatroomService: ChatroomService) { }

    @httpGet("/")
    private async getAll(req: express.Request<{}, {}, db.user.Schema>, res: express.Response): Promise<GetAllChatrooms | undefined> {
        const chatrooms = await this.chatroomService.getAll();
        res.status(200);
        return chatrooms;
    }

    @httpPost("/")
    private async newRoom(req: express.Request<{}, {}, NewRoomRequest>, res: express.Response): Promise<db.chatroom.Schema | undefined> {
        const chatroom = await this.chatroomService.newRoom(req, res);
        res.status(201);
        return chatroom;
    }

    @httpGet('/:id/messages/recent')
    private async getRecentMessagesForChatroom(@requestParam('id') id: string, @response() res: express.Response): Promise<GetLatestMessagesForChatroom | undefined> {
        const chatrooms = await this.chatroomService.getLatestMessages(id);
        res.status(200);
        return chatrooms;
    }

    @httpPost("/:id/messages")
    private async newMessage(req: express.Request<{ id: string }, {}, NewMessageRequest>, res: express.Response): Promise<db.message.Schema | undefined> {
        const message = await this.chatroomService.newMessage(req, res);
        res.status(201);
        return message;
    }
}
