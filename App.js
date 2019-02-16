import React from 'react';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import allReducers from './src/reducers';
import App from './src/App';

const store = createStore(allReducers, applyMiddleware(thunk));

export default () => (
	<Provider store={ store }>
		<App/>
	</Provider>
);