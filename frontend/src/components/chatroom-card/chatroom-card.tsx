import React from "react";
import './chatroom-card.scss';
import stc from 'string-to-color';
import TimeAgo from 'javascript-time-ago'
import { idToTimeStamp } from "../../store/utils/id-to-timestamp";

export interface ChatroomCardProps {
    name: string;
    mostRecentMessage?: {
        _id: string;
        content: string;
        sentBy: string;
    }
}

export class ChatroomCard extends React.Component<ChatroomCardProps, {}> {
    constructor(props: ChatroomCardProps) {
        super(props);
    }

    render() {
        const timeAgo = new TimeAgo('en-US');

        const firstLetter = this.props.name.charAt(0).toUpperCase();
        return (
            <article className="chatroom__card">
                <span className="card__icon" style={{ backgroundColor: stc(firstLetter) }}>
                    {firstLetter}
                </span>
                <div className="card__info">
                    <h1>{this.props.name}</h1>
                    {this.props.mostRecentMessage ? (
                        <p>{this.props.mostRecentMessage.sentBy.split(' ')[0]}: {this.props.mostRecentMessage.content}</p>
                    ) : (
                        <p>No messages yet</p>
                    )}
                </div>
                <div className="card__timestamp">
                    {this.props.mostRecentMessage && (
                        <span>{timeAgo.format(idToTimeStamp(this.props.mostRecentMessage._id))}</span>
                    )}
                </div>
            </article>
        );
    }
}
