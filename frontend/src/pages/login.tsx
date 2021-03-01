import './login.scss';
import { h, render } from 'preact';
import HelloWorld from '../components/hello-world/hello';

render(<HelloWorld name="World" />, document.querySelector('#root')!);
