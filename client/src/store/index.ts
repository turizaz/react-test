import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import api from '../middlewares/api';

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk, api))
);
export default store;
