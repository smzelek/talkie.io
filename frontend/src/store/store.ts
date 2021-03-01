import { createStore, applyMiddleware, AnyAction } from 'redux'
import { rootReducer } from "./reducers";
import thunk, { ThunkDispatch } from 'redux-thunk';
import { RootSchema } from './schemas';


export const store = createStore(rootReducer, applyMiddleware(thunk));
// export
// @injectable()
// export class StoreService {
//     private readonly store: Store<RootSchema>;
//     private readonly _store$: BehaviorSubject<RootSchema>;

//     get store$() {
//         return this._store$.asObservable();
//     };


//     constructor() {
//         this.store = createStore(rootReducer);
//         this.store.dispatch
//         this._store$ = new BehaviorSubject(this.store.getState());
//         this.store.subscribe(() => {
//             this._store$.next(this.store.getState());
//         });
//     }

//     dispatch(action: AnyAction) {
//         return this.store.dispatch(action);
//     }
// }