import './login.scss';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import React from "react";
import { Link } from 'react-router-dom';
import { actions, RootSchema, selectors } from '~frontend/store';
import { ThunkDispatchProp } from '~frontend/utils';

interface LoginProps {
    checkingLogin: boolean;
    loggingIn: boolean;
}

interface LoginState {
    username: string;
}

class _LoginPage extends React.Component<LoginProps & ThunkDispatchProp, LoginState> {
    constructor(props: LoginProps & ThunkDispatchProp) {
        super(props);
        this.state = { username: '' };
    }

    onUsernameInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ username: event.target.value.toLowerCase() });
    }

    componentDidMount() {
        this.props.dispatch(actions.login.checkLogin$(() => {
            this.props.dispatch(push('/chat'));
        }));
    }

    login() {
        this.props.dispatch(actions.login.login$(this.state.username));
    }

    render() {
        return (
            <div id="container">
                <div className="login">
                    <div className="welcome-card">
                        <h1>
                            welcome to <span className="app-name">Talkie.io</span>
                        </h1>
                        <h2>Please login or <Link to="/sign-up">sign up</Link></h2>
                        <label>
                            Username
                            <input type="text" value={this.state.username} onChange={(e) => this.onUsernameInput(e)} />
                        </label>
                        <button type="submit" onClick={() => this.login()}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootSchema): LoginProps => {
    return {
        checkingLogin: selectors.login.checkingLogin(state).inProgress,
        loggingIn: selectors.login.loggingIn(state).inProgress,
    };
};

export const LoginPage = connect(mapStateToProps)(_LoginPage);
