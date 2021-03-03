import { db } from "~db";

const getRoutes = (baseUrl: string) => ({
    '/login': `${baseUrl}/login`,
    '/users': `${baseUrl}/users`,
    '/chatrooms': `${baseUrl}/chatrooms`,
    '/chatrooms/:id/messages': (id: db.chatroom.Schema['_id']) => `${baseUrl}/chatrooms/${id}/messages`,
    '/chatrooms/:id/messages/recent': (id: db.chatroom.Schema['_id']) => `${baseUrl}/chatrooms/${id}/messages/recent`,
});

export class Routes {
    static relativeTo = getRoutes;
}