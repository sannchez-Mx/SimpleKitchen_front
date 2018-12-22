import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import '../node_modules/uikit/dist/css/uikit.min.css'
import '../node_modules/uikit/dist/js/uikit-icons'
import '../node_modules/uikit/dist/js/uikit-core'
import '../node_modules/uikit/dist/js/uikit'

const WithRouter = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(<WithRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
