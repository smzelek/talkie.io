import './login.scss';
import { RootSchema } from '../store/schemas';
import { connect } from 'react-redux';
import React from "react";
import actions from '../store/actions';
import { ThunkDispatch } from 'redux-thunk';


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

    // this.props.dispatch(actions.login.checkLogin$())
    // if Logged in, redirect to chat page.

    constructor(props: LoginProps & ThunkDispatchProp) {
        super(props);
        this.state = { username: '' };
    }

    onUsernameInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ username: event.target.value.toLowerCase() });
    }

    login() {
        this.props.dispatch(actions.login.login$(this.state.username))
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
                    {/* <button onClick={() => }>
                        check login?
                    </button> */}
                    Are we checking?...
                    {this.props.checkingLogin ? 'yea!!!!' : 'no... too lazy'}
                    Are we logging in?...

                    {this.props.loggingIn ? 'yea!!!!' : 'no... too lazy'}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootSchema): LoginProps => {
    console.log('map', state)
    return {
        checkingLogin: state.login.checkingLogin.inProgress,
        loggingIn: state.login.loggingIn.inProgress,

    };
};

export default connect(mapStateToProps)(LoginPage);


// Splash screen w/ Talkio logo
// username input, fake password input (grayed out)
// login button
// No account? Sign up hyperlink button (changes view to signup page)

// signup page -> 2 text boxes (username, name)
// create account btn, creates account and logs user in

