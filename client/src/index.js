import 'bulma/css/bulma.css';
import './styles/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';

import App from './components/App';
import reducers from './reducers';

//dev only, remove in prod
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
