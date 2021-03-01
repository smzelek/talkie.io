import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import actions from "../../store/actions";
import { RootSchema } from "../../store/schemas";
import selectors from "../../store/selectors";
import './new-chatroom.scss';

export interface NewChatroomProps {
    creatingRoom: boolean;
}

interface ThunkDispatchProp {
    dispatch: ThunkDispatch<RootSchema, {}, any>;
}

interface NewChatroomState {
    name: string;
}

export class NewChatroom extends React.Component<NewChatroomProps & ThunkDispatchProp, NewChatroomState> {
    constructor(props: NewChatroomProps & ThunkDispatchProp) {
        super(props);
        this.state = { name: '' };
    }

    onNameInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ name: event.target.value });
    }

    onCreate() {
        this.props.dispatch(actions.chatroom.create$(this.state.name));
    }

    render() {
        return (
            <div className="new-chatroom">
                <div className="card">
                    <h2>Choose a name for the new room</h2>
                    <label>
                        Room name
                        <input disabled={this.props.creatingRoom} value={this.state.name} onChange={(e) => this.onNameInput(e)} />
                    </label>
                    <button disabled={this.props.creatingRoom} onClick={() => this.onCreate()}>
                        Create Room
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootSchema): NewChatroomProps => {
    return {
        creatingRoom: selectors.chatroom.creating(state).inProgress
    };
};

export default connect(mapStateToProps)(NewChatroom);
