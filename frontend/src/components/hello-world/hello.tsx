import { h, Component } from 'preact';

export interface HelloWorldProps {
    name: string
}

export default class HelloWorld extends Component<HelloWorldProps, any> {
    render(props: HelloWorldProps) {
        return <p>Hel..!.lo {props.name}!</p>
    }
}