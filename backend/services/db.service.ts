import { injectable } from "inversify";
import { connect, Model } from "mongoose";
import * as db from '../../db';
import { BehaviorSubject, race, Subject } from 'rxjs';
import { filter, skip, take } from 'rxjs/operators';
import { APIError } from '../error';

export interface IDbService {
    Users: () => Promise<Model<db.user.Document>>;
    Chatrooms: () => Promise<Model<db.chatroom.Document>>;
    Messages: () => Promise<Model<db.message.Document>>;
}

interface ConnectionStatus {
    success: boolean;
    error?: string;
}

@injectable()
export class DbService implements IDbService {
    private static DB_URL = "mongodb://mongodb:27017/talkieio";
    private connectionStatus$ = new BehaviorSubject<ConnectionStatus>({ success: false, error: undefined });
    private connectionRequested$ = new Subject<void>();

    constructor() {
        this.debounceConnectionRequest();
    }

    async Users(): Promise<Model<db.user.Document>> {
        await this.attemptDbConnection();
        return db.user.model;
    }

    async Messages(): Promise<Model<db.message.Document>> {
        await this.attemptDbConnection();
        return db.message.model;
    }

    async Chatrooms(): Promise<Model<db.chatroom.Document>> {
        await this.attemptDbConnection();
        return db.chatroom.model;
    }

    private debounceConnectionRequest() {
        return this.connectionRequested$
            .pipe(take(1))
            .subscribe(async () => {
                try {
                    await connect(DbService.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
                    this.connectionStatus$.next({ success: true, error: undefined });
                }
                catch (err) {
                    this.connectionStatus$.next({ success: true, error: 'Database unavailable.' });
                    this.debounceConnectionRequest();
                }
            });
    }

    private async attemptDbConnection() {
        this.connectionRequested$.next();
        const status = await race(
            this.connectionStatus$.pipe(filter(ready => ready.success)),
            this.connectionStatus$.pipe(skip(1), filter(ready => !!ready.error)),
        ).pipe(take(1)).toPromise();

        if (status.error) {
            throw new APIError(500, status.error);
        }
    }
}