import React from "react";
import { idToTimeStamp, stringToColor, timestampToTimeAgo } from "~frontend/utils";
import './chatroom-card.scss';

export interface ChatroomCardProps {
    name: string;
    mostRecentMessage?: {
        _id: string;
        content: string;
        sentBy: string;
    }
}

export class ChatroomCard extends React.Component<ChatroomCardProps> {
    constructor(props: ChatroomCardProps) {
        super(props);
    }

    render(): JSX.Element {
        const firstLetter = this.props.name.charAt(0).toUpperCase();
        return (
            <article className="chatroom__card">
                <span className="card__icon" style={{ backgroundColor: stringToColor(firstLetter) }}>
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
                        <span>{timestampToTimeAgo(idToTimeStamp(this.props.mostRecentMessage._id))}</span>
                    )}
                </div>
            </article>
        );
    }
}
