import React from "react";

export interface HelloWorldProps {
    name: string
}

export default class HelloWorld extends React.Component<HelloWorldProps, {}> {
    constructor(props: HelloWorldProps) {
        super(props);
    }
    render() {
        return <p>Hello {this.props.name}!</p>
    }
}