import { core } from "~core";
import { db } from "~db";

const routes = core.Routes.relativeTo('http://localhost:8000');

export class APIService {
    static async checkLogin() {
        const res = await fetch(routes["/login"], {
            credentials: 'include',
        });
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

    static async login(username: db.user.Schema['username']) {
        const res = await fetch(routes["/login"], {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify({ username }),
        });
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

    static async signUp(username: db.user.Schema['username'], name: db.user.Schema['name']): Promise<db.user.Schema> {
        const res = await fetch(routes["/users"], {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify({ username, name }),
        });
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

    static async logout() {
        const res = await fetch(routes["/login"], {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

    static async getAllChatrooms() {
        const res = await fetch(routes["/chatrooms"]);
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

    static async getRecentMessagesForChatroom(id: db.chatroom.Schema['_id']) {
        const res = await fetch(routes["/chatrooms/:id/messages/recent"](id));
        if (!res.ok) { throw await res.json() }
        return await res.json();
    }

    static async sendMessage(id: db.chatroom.Schema['_id'], content: db.message.Schema['content']) {
        const res = await fetch(routes["/chatrooms/:id/messages"](id), {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify({ content }),
        });
        if (!res.ok) { throw await res.json() }
        return await res.json();
    }


    static async createRoom(name: db.chatroom.Schema['name']): Promise<db.chatroom.Schema> {
        const res = await fetch(routes["/chatrooms"], {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify({ name }),
        });
        if (!res.ok) { throw await res.json() }
        return await res.json();
    }
}