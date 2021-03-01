import * as db from '../../db';

export type GetAllChatroomsResponse = ChatroomWithInfo[];

export type ChatroomWithInfo = (Omit<db.chatroom.Schema, 'user_createdby'> & {
    user_createdby: db.user.Schema
});
