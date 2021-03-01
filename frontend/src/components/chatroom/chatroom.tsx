import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { ChatroomMessage } from "../../../../core";
import actions from "../../store/actions";
import { RootSchema } from "../../store/schemas";
import selectors from "../../store/selectors";
import { ChatBubble } from "../chat-bubble/chat-bubble";
import './chatroom.scss';
import * as db from '../../../../db';

export interface ChatroomProps {
    messages?: ChatroomMessage[];
    loadingMessages: boolean;
    sendingMessage: boolean;
    sentMessage: boolean;
    currentUser?: db.user.Schema;
}

interface ThunkDispatchProp {
    dispatch: ThunkDispatch<RootSchema, {}, any>;
}

interface RouteParams {
    id: string;
};

interface ChatroomState {
    message: string;
}

export class Chatroom extends React.Component<RouteComponentProps<RouteParams> & ChatroomProps & ThunkDispatchProp, ChatroomState> {
    constructor(props: RouteComponentProps<RouteParams> & ChatroomProps & ThunkDispatchProp) {
        super(props);
        this.state = { message: '' };
    }

    componentDidMount() {
        this.props.dispatch(actions.chatroom.loadRecentMessages$(this.props.match.params.id));
    }

    componentDidUpdate(prevProps: RouteComponentProps<RouteParams> & ChatroomProps & ThunkDispatchProp) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.dispatch(actions.chatroom.loadRecentMessages$(this.props.match.params.id));
        }

        if (this.props.sentMessage && !prevProps.sentMessage) {
            this.setState({ message: '' });
        }
    }

    onMessageInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ message: event.target.value });
    }

    sendMessage() {
        this.props.dispatch(actions.chatroom.sendMessage$(this.props.match.params.id, this.state.message))
    }

    render() {
        return (
            <section className="chat">
                <main className="chat__view">
                    {(this.props.messages || [])?.map((m, i) => {
                        const isContinued = (i + 1 < this.props.messages!.length) && this.props.messages![i + 1].user_sentby._id === m.user_sentby._id;
                        const isCurrentUser = m.user_sentby._id === this.props.currentUser?._id;
                        return <ChatBubble key={m._id} name={m.user_sentby.name} sentByUser={isCurrentUser} appearContinued={isContinued} content={m.content} />
                    })}
                </main>
                <footer className="chat__input">
                    <textarea disabled={this.props.sendingMessage} value={this.state.message} onChange={(e) => this.onMessageInput(e)} />
                    <button disabled={this.props.sendingMessage} onClick={() => this.sendMessage()}> Send </button>
                </footer>
            </section>
        )
    }
}


const mapStateToProps = (state: RootSchema): ChatroomProps => {
    return {
        loadingMessages: selectors.chatroom.loadingMessages(state).inProgress,
        messages: selectors.chatroom.messages(state),
        currentUser: selectors.login.currentUser(state),
        sendingMessage: selectors.chatroom.sendingMessage(state).inProgress,
        sentMessage: selectors.chatroom.sendingMessage(state).success
    };
};

export default connect(mapStateToProps)(Chatroom);
