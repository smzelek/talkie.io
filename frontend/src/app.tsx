import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './global.scss';
import { ChatPage, LoginPage, SignUpPage } from '~frontend/pages';
import { store, history } from './store';

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
                        <Route path="/sign-up" render={() => (
                            <SignUpPage />
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
