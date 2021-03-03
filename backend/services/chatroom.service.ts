import { core } from "~core";
import { db } from "~db";
import { IChatroomService, IDbService, ILoginService } from "~backend/interfaces";
import { inject, injectable } from "inversify";
import { TOKENS } from "~backend/tokens";
import express from "express";

@injectable()
export class ChatroomService implements IChatroomService {
    constructor(
        @inject(TOKENS.DbService) private dbService: IDbService,
        @inject(TOKENS.LoginService) private loginService: ILoginService
    ) { }

    async getAll(): Promise<core.GetAllChatrooms | undefined> {
        const Chatroom = await this.dbService.Chatrooms();

        const allChatroomsWithLatestMessage = await Chatroom.aggregate([
            {
                '$lookup': {
                    'from': 'messages',
                    'as': 'latest_message',
                    'let': {
                        'id': '$_id'
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$$id', '$chatroom_sentto'
                                    ]
                                }
                            }
                        }, {
                            '$sort': {
                                '_id': -1
                            }
                        }, {
                            '$limit': 1
                        }
                    ]
                }
            }, {
                '$addFields': {
                    'latest_message': {
                        '$arrayElemAt': [
                            '$latest_message', 0
                        ]
                    }
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'latest_message.user_sentby',
                    'foreignField': '_id',
                    'as': 'latest_message_sentby'
                }
            }, {
                '$addFields': {
                    'latest_message_sentby': {
                        '$arrayElemAt': [
                            '$latest_message_sentby', 0
                        ]
                    }
                }
            }
        ]);

        return allChatroomsWithLatestMessage.map((c): core.ChatroomWithInfo => ({
            _id: c._id,
            name: c.name,
            user_createdby: c.user_createdby,
            mostRecentMessage: c.latest_message ? {
                _id: c.latest_message._id,
                content: c.latest_message.content,
                sentBy: c.latest_message_sentby.name,
            } : undefined
        }));
    }

    async getLatestMessages(id: db.chatroom.Schema['_id']): Promise<core.GetLatestMessagesForChatroom | undefined> {
        const Chatroom = await this.dbService.Chatrooms();
        const chatroom = await Chatroom.findById(id);
        if (!chatroom) {
            throw new core.APIError(404, 'Chatroom does not exist.');
        }

        const Message = await this.dbService.Messages();

        const messages = await Message.find({ chatroom_sentto: id } as db.message.Schema)
            .limit(50)
            .sort({ _id: -1 })
            .populate('user_sentby');

        return messages.map((m): core.ChatroomMessage => ({
            _id: m._id,
            content: m.content,
            user_sentby: m.user_sentby,
        }));
    }

    async newMessage(req: express.Request<{ id: string }, {}, core.NewMessageRequest>, res: express.Response): Promise<db.message.Schema> {
        const currentUser = await this.loginService.currentUser(req, res);

        const Chatrooms = await this.dbService.Chatrooms();
        const chatroom = await Chatrooms.findById(req.params.id);

        if (!chatroom) {
            throw new core.APIError(404, 'Chatroom does not exist.');
        }

        const Messages = await this.dbService.Messages();

        const message = await Messages.create({
            chatroom_sentto: req.params.id,
            content: req.body.content,
            user_sentby: currentUser!._id
        } as db.message.Schema)

        return ChatroomService.messageDocumentToSchema(message);
    }

    async newRoom(req: express.Request<{}, {}, core.NewRoomRequest>, res: express.Response): Promise<db.chatroom.Schema> {
        const currentUser = await this.loginService.currentUser(req, res);

        const Chatrooms = await this.dbService.Chatrooms();

        const chatroom = await Chatrooms.create({
            user_createdby: currentUser!._id,
            name: req.body.name
        } as db.chatroom.Schema);

        return ChatroomService.chatroomDocumentToSchema(chatroom);
    }

    static messageDocumentToSchema(document: db.message.Document): db.message.Schema {
        return {
            _id: document._id,
            content: document.content,
            user_sentby: document.user_sentby,
            chatroom_sentto: document.chatroom_sentto
        };
    }

    static chatroomDocumentToSchema(document: db.chatroom.Document): db.chatroom.Schema {
        return {
            _id: document._id,
            name: document.name,
            user_createdby: document.user_createdby,
        };
    }
}