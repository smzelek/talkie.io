import './sign-up.scss';
import { connect } from 'react-redux';
import { RootSchema } from '../store/schemas';
import { ThunkDispatch } from 'redux-thunk';
import actions from '../store/actions';
import React from "react";
import selectors from '../store/selectors';
import { Link } from 'react-router-dom';

interface SignUpProps {
    creatingUser: boolean;
}

interface ThunkDispatchProp {
    dispatch: ThunkDispatch<RootSchema, {}, any>;
}

interface SignUpState {
    username: string;
    name: string;
}

class SignUpPage extends React.Component<SignUpProps & ThunkDispatchProp, SignUpState> {
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

export default connect(mapStateToProps)(SignUpPage);
