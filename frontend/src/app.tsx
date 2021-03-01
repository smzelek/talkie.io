import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import LoginPage from './pages/login';

const App = () => (
    <Provider store={store}>
        <LoginPage />
    </Provider>
);

ReactDOM.render(<App />, document.querySelector('#root')!);
