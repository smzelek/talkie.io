import './apps.scss';
import { h, render } from 'preact';
import HelloWorld from '../components/HelloWorld';

render(<HelloWorld name="World" />, document.querySelector('#app'));
