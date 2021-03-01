import React from "react";
import './chat-bubble.scss';
import stc from 'string-to-color';

export interface ChatBubbleProps {
    name: string;
    content: string;
    appearContinued: boolean;
    sentByUser: boolean;
}

export class ChatBubble extends React.Component<ChatBubbleProps, {}> {
    constructor(props: ChatBubbleProps) {
        super(props);
    }

    render() {
        return (
            <article className={`chat-bubble ${this.props.appearContinued ? 'continued' : ''} ${this.props.sentByUser ? 'from-user' : ''}`}>
                <h1 style={{ color: stc(this.props.name) }} className="chat-bubble__author">{this.props.name}</h1>
                <p className="chat-bubble__message">{this.props.content}</p>
            </article>
        );
    }
}
