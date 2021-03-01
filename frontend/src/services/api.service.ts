import * as db from '../../../db';

export class APIService {
    static async checkLogin() {
        const res = await fetch('http://localhost:8000/login', {
            credentials: 'include',
        });
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

    static async login(username: db.user.Schema['username']) {
        const res = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify({ username }),
        });
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

    static async signUp(username: db.user.Schema['username'], name: db.user.Schema['name']): Promise<db.user.Schema> {
        const res = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify({ username, name }),
        });
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

    static async logout() {
        const res = await fetch('http://localhost:8000/login', {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

    static async getAllChatrooms() {
        const res = await fetch('http://localhost:8000/chatrooms');
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }


    static async getRecentMessagesForChatroom(id: db.chatroom.Schema['_id']) {
        const res = await fetch(`http://localhost:8000/chatrooms/${id}/messages/recent`);
        if (!res.ok) { throw await res.json() }
        return await res.json();
    }

    static async sendMessage(chatroom_id: db.chatroom.Schema['_id'], content: db.message.Schema['content']) {
        const res = await fetch(`http://localhost:8000/chatrooms/${chatroom_id}/messages`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify({ content }),
        });
        if (!res.ok) { throw await res.json() }
        return await res.json();
    }


    static async createRoom(name: db.chatroom.Schema['name']): Promise<db.chatroom.Schema> {
        const res = await fetch(`http://localhost:8000/chatrooms/`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify({ name }),
        });
        if (!res.ok) { throw await res.json() }
        return await res.json();
    }

}