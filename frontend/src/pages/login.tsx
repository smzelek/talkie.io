import './login.scss';
import { h, render } from 'preact';
import HelloWorld from '../components/hello-world/hello-world';

render(<HelloWorld name="World" />, document.querySelector('#root')!);
