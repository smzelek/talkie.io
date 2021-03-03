import express from "express";
import { Model } from "mongoose";
import { core } from "~core";
import { db } from "~db";

export interface IChatroomService {
    getAll: () => Promise<core.GetAllChatrooms | undefined>;
    getLatestMessages: (id: db.chatroom.Schema['_id']) => Promise<core.GetLatestMessagesForChatroom | undefined>;
    newMessage: (req: express.Request<{ id: string }, {}, core.NewMessageRequest>, res: express.Response) => Promise<db.message.Schema>;
    newRoom: (req: express.Request<{}, {}, core.NewRoomRequest>, res: express.Response) => Promise<db.chatroom.Schema>;
};

export interface ILoginService {
    currentUser: (req: express.Request, res: express.Response) => Promise<db.user.Schema | undefined>;
    login: (req: express.Request<{}, {}, core.LoginRequest>, res: express.Response) => Promise<db.user.Schema | undefined>;
    logout: (req: express.Request, res: express.Response) => void;
};

export interface IDbService {
    Users: () => Promise<Model<db.user.Document>>;
    Chatrooms: () => Promise<Model<db.chatroom.Document>>;
    Messages: () => Promise<Model<db.message.Document>>;
};

export interface IUserService {
    createUser: (user: db.user.Schema) => Promise<db.user.Schema | undefined>;
    getUserById: (userId: db.user.Document['id']) => Promise<db.user.Schema | undefined>;
    getUserByUsername: (username: db.user.Schema['username']) => Promise<db.user.Schema | undefined>;
};
