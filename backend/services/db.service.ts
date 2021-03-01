// import "reflect-metadata";
import { injectable } from "inversify";
import { connect, Model } from "mongoose";
import * as db from '../../db';
import { BehaviorSubject, race, Subject } from 'rxjs';
import { filter, skip, take } from 'rxjs/operators';

export interface IDbService {
    users: () => Promise<Model<db.user.document>>;
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

    async users(): Promise<Model<db.user.document>> {
        await this.attemptDbConnection();
        return db.user.model;
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
            throw status.error;
        }
    }
}