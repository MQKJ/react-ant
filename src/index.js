import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import App from './components/App/App';
import registerServiceWorker from './static/js/registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/reducers';

// const supportsHistory = 'pushState' in window.history;

// 这是默认的确认函数
const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message);
    callback(allowTransition);
}
const store = createStore(reducers);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter
            forceRefresh={true}
            getUserConfirmation={getConfirmation}
            keyLength={12}
        >
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
