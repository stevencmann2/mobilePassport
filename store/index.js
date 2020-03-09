import {
    applyMiddleware,
    compose,
    createStore
} from 'redux';

import rootReducer from './reducers';
import ReduxThunk from 'redux-thunk'



const configureStore = (initialState = {}) => {
    const enhancers = [];
    const middleware = [ReduxThunk];


if (window && window.location && window.location.hostname === 'localhost') {

    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        ...enhancers,
    ),
);

store.asyncReducers = {};

if (module.hot) {
    module.hot.accept('./reducers', () => {

        const reducers = require('./reducers').default;
        store.replaceReducer(reducers(store.asyncReducers));
    });
}

return store;

}

export default configureStore;

