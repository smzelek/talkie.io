import { createStore, applyMiddleware, compose, } from 'redux'
import { createRootReducer } from "./reducers";
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory();
export const store = createStore(createRootReducer(history),
    applyMiddleware(
        routerMiddleware(history),
        thunk,
    ),
);
