import './login.scss';
import { RootSchema } from '../store/schemas';
import { connect } from 'react-redux';
import React from "react";
import actions from '../store/actions';
import { ThunkDispatch } from 'redux-thunk';
import * as db from '../../../db';
import selectors from '../store/selectors';
import { ChatroomWithInfo } from '../../../core';

interface ChatProps {
    currentUser?: db.user.Schema;
    chatrooms?: ChatroomWithInfo[];
}

interface ThunkDispatchProp {
    dispatch: ThunkDispatch<RootSchema, {}, any>;
}

interface ChatState {
}

class ChatPage extends React.Component<ChatProps & ThunkDispatchProp, ChatState> {
    constructor(props: ChatProps & ThunkDispatchProp) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(actions.login.checkLogin$());
        this.props.dispatch(actions.chatroom.load$());
    }

    render() {
        return (
            <div id="container">
                <div id="app">
                    Welcome to Talkie.io! Time to CHAT, {this.props.currentUser?.name}!

                    {this.props.chatrooms?.map(c => {
                    return <p>{c.name} - created by {c.user_createdby.name}</p>
                })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootSchema): ChatProps => {
    return {
        currentUser: selectors.login.currentUser(state),
        chatrooms: selectors.chatroom.chatrooms(state)
    };
};

export default connect(mapStateToProps)(ChatPage);
