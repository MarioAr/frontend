import React from "react";
import ReactDOM from "react-dom";
import './configs/Styles/index.scss';
import store from 'modules/redux/stores';
import { Provider } from 'react-redux';
import { App } from 'modules/app';

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById("root"));