import express from "express";
import { interfaces, controller, httpGet, requestParam, response, httpPost, } from "inversify-express-utils";
import { inject } from "inversify";
import { IChatroomService } from "~backend/interfaces";
import { db } from "~db";
import { core } from "~core";
import { TOKENS } from "~backend/tokens";
import { routes } from '~backend/routes';

@controller('')
export class ChatroomController implements interfaces.Controller {

    constructor(@inject(TOKENS.ChatroomService) private chatroomService: IChatroomService) { }

    @httpGet(routes["/chatrooms"])
    private async getAll(req: express.Request<{}, {}, db.user.Schema>, res: express.Response): Promise<core.GetAllChatrooms | undefined> {
        const chatrooms = await this.chatroomService.getAll();
        res.status(200);
        return chatrooms;
    }

    @httpPost(routes["/chatrooms"])
    private async newRoom(req: express.Request<{}, {}, core.NewRoomRequest>, res: express.Response): Promise<db.chatroom.Schema | undefined> {
        const chatroom = await this.chatroomService.newRoom(req, res);
        res.status(201);
        return chatroom;
    }

    @httpPost(routes["/chatrooms/:id/messages"](':id'))
    private async newMessage(req: express.Request<{ id: string }, {}, core.NewMessageRequest>, res: express.Response): Promise<db.message.Schema | undefined> {
        const message = await this.chatroomService.newMessage(req, res);
        res.status(201);
        return message;
    }

    @httpGet(routes["/chatrooms/:id/messages/recent"](':id'))
    private async getRecentMessagesForChatroom(@requestParam('id') id: string, @response() res: express.Response): Promise<core.GetLatestMessagesForChatroom | undefined> {
        const chatrooms = await this.chatroomService.getLatestMessages(id);
        res.status(200);
        return chatrooms;
    }
}
