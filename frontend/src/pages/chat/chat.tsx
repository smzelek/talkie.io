import './chat.scss';
import { connect } from 'react-redux';
import { core } from '~core';
import { db } from '~db';
import { Link, NavLink, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { push } from 'connected-react-router';
import React from "react";
import { idToTimeStamp, stringToColor, ThunkDispatchProp } from '~frontend/utils';
import { Chatroom, ChatroomCard, NewChatroom } from '~frontend/components';
import { actions, RootSchema, selectors } from '~frontend/store';

interface ChatProps {
    currentUser?: db.user.Schema;
    chatrooms?: core.ChatroomWithInfo[];
}

interface ChatState {
}

class _ChatPage extends React.Component<ChatProps & ThunkDispatchProp & RouteComponentProps<{}>, ChatState> {
    constructor(props: ChatProps & ThunkDispatchProp & RouteComponentProps<{}>) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(actions.login.checkLogin$(() => { }, () => {
            this.props.dispatch(push('/login'));
        }));
        this.props.dispatch(actions.chatroom.load$());
    }

    onLogout() {
        this.props.dispatch(actions.login.logout$());
    }

    sortChatrooms(c1: core.ChatroomWithInfo, c2: core.ChatroomWithInfo) {
        if (!c1.mostRecentMessage && c1.user_createdby === this.props.currentUser?._id) {
            return -1;
        }
        if (!c2.mostRecentMessage && c2.user_createdby === this.props.currentUser?._id) {
            return 1;
        }
        return idToTimeStamp(c2.mostRecentMessage?._id) - idToTimeStamp(c1.mostRecentMessage?._id);
    }

    render() {
        return (
            <div id="container">
                <div className="chatroom">
                    <aside className="chatroom__sidebar">
                        <section className="sidebar__header">
                            <div className="identifiers">
                                <h1>Talkie.io</h1>
                                <h2>
                                    chatting as <span className="name" style={{ color: stringToColor(this.props.currentUser?.name) }}>{this.props.currentUser?.name}</span>
                                </h2>
                            </div>
                            <div className="actions">
                                <button onClick={() => this.onLogout()}>logout</button>
                            </div>
                        </section>
                        <ul className="sidebar__list">
                            <div className="new-room-option">
                                <Link to={`${this.props.match.path}/new`}>create new room</Link>
                            </div>
                            {this.props.chatrooms
                                ?.sort((c1, c2) => this.sortChatrooms(c1, c2))
                                ?.map(c => (
                                    <li key={c._id}>
                                        <NavLink activeClassName='is-active' to={`${this.props.match.path}/${c._id}`}>
                                            <ChatroomCard mostRecentMessage={c.mostRecentMessage} name={c.name} />
                                        </NavLink>
                                    </li>
                                ))}
                        </ul>
                    </aside>
                    <main className="chatroom__window">
                        <Switch>
                            <Route exact path={this.props.match.path}>
                                <div className="no-chatroom">
                                    <h3>Join a chatroom...</h3>
                                </div>
                            </Route>
                            <Route exact path={`${this.props.match.path}/new`} component={NewChatroom}>
                            </Route>
                            <Route path={`${this.props.match.path}/:id`} component={Chatroom} />
                        </Switch>
                    </main>
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

export const ChatPage = connect(mapStateToProps)(_ChatPage);
