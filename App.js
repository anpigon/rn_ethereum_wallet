import React from 'react';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import allReducers from './src/reducers';
import App from './src/App';

const logger = createLogger(); 

const store = createStore(allReducers, applyMiddleware(logger, thunk));

export default () => (
	<Provider store={ store }>
		<App/>
	</Provider>
);