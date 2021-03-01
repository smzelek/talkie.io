import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './store/store';
import LoginPage from './pages/login';
import ChatPage from './pages/chat';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './global.scss';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

class App extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (<Provider store={store}>
            <ConnectedRouter history={history}>
                <>
                    <Switch>
                        <Route path="/login" render={() => (
                            <LoginPage />
                        )} />
                        <Route path="/chat" component={ChatPage} />
                        <Route exact path="/" render={() => (
                            <Redirect to="/login" />
                        )} />
                    </Switch>
                </>
            </ConnectedRouter>
        </Provider>);
    }

}

ReactDOM.render(<App />, document.querySelector('#root')!);
