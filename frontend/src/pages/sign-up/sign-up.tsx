import './sign-up.scss';
import { connect } from 'react-redux';
import React from "react";
import { Link } from 'react-router-dom';
import { selectors, actions, RootSchema } from '~frontend/store';
import { ThunkDispatchProp } from '~frontend/utils';

interface SignUpProps {
    creatingUser: boolean;
}

interface SignUpState {
    username: string;
    name: string;
}

class _SignUpPage extends React.Component<SignUpProps & ThunkDispatchProp, SignUpState> {
    constructor(props: SignUpProps & ThunkDispatchProp) {
        super(props);
        this.state = { username: '', name: '' };
    }

    onUsernameInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ username: event.target.value.toLowerCase() });
    }

    onNameInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ name: event.target.value });
    }

    signUp() {
        this.props.dispatch(actions.login.signUp$(this.state.username, this.state.name));
    }

    render() {
        return (
            <div id="container">
                <div className="sign-up">
                    <div className="welcome-card">
                        <h1>
                            welcome to <span className="app-name">Talkie.io</span>
                        </h1>
                        <h2>Create your account or <Link to='/login'>back to login</Link></h2>
                        <label>
                            Username
                            <input type="text" value={this.state.username} onChange={(e) => this.onUsernameInput(e)} />
                        </label>
                        <label>
                            Name
                            <input type="text" value={this.state.name} onChange={(e) => this.onNameInput(e)} />
                        </label>
                        <button onClick={() => this.signUp()} type="submit" >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootSchema): SignUpProps => {
    return {
        creatingUser: selectors.login.creatingUser(state).inProgress,
    };
};

export const SignUpPage = connect(mapStateToProps)(_SignUpPage);
