import * as db from '../../../db';

export class APIService {
    static async checkLogin() {
        const res = await fetch('http://localhost:8000/login');
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

    static async login(username: db.user.Schema['username']) {
        const res = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ username })
        });
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

}