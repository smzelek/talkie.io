import './login.scss';
import { RootSchema } from '../store/schemas';
import { connect } from 'react-redux';
import React from "react";
import actions from '../store/actions';
import { ThunkDispatch } from 'redux-thunk';
import selectors from '../store/selectors';

interface LoginProps {
    checkingLogin: boolean;
    loggingIn: boolean;
}

interface ThunkDispatchProp {
    dispatch: ThunkDispatch<RootSchema, {}, any>;
}

interface LoginState {
    username: string;
}

class LoginPage extends React.Component<LoginProps & ThunkDispatchProp, LoginState> {
    constructor(props: LoginProps & ThunkDispatchProp) {
        super(props);
        this.state = { username: '' };
    }

    onUsernameInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ username: event.target.value.toLowerCase() });
    }

    componentDidMount() {
        this.props.dispatch(actions.login.checkLogin$());
    }

    login() {
        this.props.dispatch(actions.login.login$(this.state.username));
    }

    render() {
        return (
            <div id="container">
                <div id="app">
                    Welcome to Talkie.io! Please login.
                        <label>
                        Username:
                            <input type="text" value={this.state.username} onChange={(e) => this.onUsernameInput(e)} />
                    </label>
                    <button type="submit" onClick={() => this.login()}>
                        Submit
                        </button>
                    {this.state.username}
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

export default connect(mapStateToProps)(LoginPage);
