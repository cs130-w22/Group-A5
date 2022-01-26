import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './routes/store/store';
import AppRouter from './routes/router/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './routes/styles.css';

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
, document.getElementById("root"));