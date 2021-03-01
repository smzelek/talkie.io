import * as db from '../db';

export type GetAllChatrooms = ChatroomWithInfo[];
export type GetLatestMessagesForChatroom = ChatroomMessage[];

export type ChatroomMessage = (Omit<db.message.Schema, 'chatroom_sentto' | 'user_sentby'> & {
    user_sentby: db.user.Schema;
});

export type ChatroomWithInfo = db.chatroom.Schema & {
    mostRecentMessage?: {
        content: string;
        sentBy: string;
        _id: string;
    }
};

export interface NewRoomRequest {
    name: db.chatroom.Schema['name'];
}

export interface NewMessageRequest {
    content: db.message.Schema['content'];
}

export interface LoginRequest {
    username: db.user.Schema['username'];
}
