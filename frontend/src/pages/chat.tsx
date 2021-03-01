import './login.scss';
import { RootSchema } from '../store/schemas';
import { connect } from 'react-redux';
import React from "react";
import actions from '../store/actions';
import { ThunkDispatch } from 'redux-thunk';
import * as db from '../../../db';
import selectors from '../store/selectors';
import { NavLink, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Chatroom from '../components/chatroom/chatroom';
import { ChatroomWithInfo } from '../../../core';
import { push } from 'connected-react-router';
import './chat.scss';
import { ChatroomCard } from '../components/chatroom-card/chatroom-card';
import stc from 'string-to-color';
import { idToTimeStamp } from '../store/utils/id-to-timestamp';
import { NewChatroom } from '../components/new-room/new-room';

interface ChatProps {
    currentUser?: db.user.Schema;
    chatrooms?: ChatroomWithInfo[];
}

interface ThunkDispatchProp {
    dispatch: ThunkDispatch<RootSchema, {}, any>;
}

interface ChatState {
}

class ChatPage extends React.Component<ChatProps & ThunkDispatchProp & RouteComponentProps<{}>, ChatState> {
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

    render() {
        return (
            <div id="container">
                <div className="chatroom">
                    <aside className="chatroom__sidebar">
                        <section className="sidebar__header">
                            <div className="identifiers">
                                <h1>Talkie.io</h1>
                                <h2>
                                    chatting as <span className="name" style={{ color: stc(this.props.currentUser?.name) }}>{this.props.currentUser?.name}</span>
                                </h2>
                            </div>
                            <div className="actions">
                                <button onClick={() => this.onLogout()}>logout</button>
                            </div>
                        </section>
                        <ul className="sidebar__list">
                            {this.props.chatrooms
                                ?.sort((c1, c2) => idToTimeStamp(c2.mostRecentMessage?._id) - idToTimeStamp(c1.mostRecentMessage?._id))
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
                            <Route exact path={`${this.props.match.path}/new`}>
                                <NewChatroom />
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

export default connect(mapStateToProps)(ChatPage);
