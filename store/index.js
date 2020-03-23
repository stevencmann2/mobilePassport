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

let composeEnhancers = compose;
if(__DEV__) {
    composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware),
        ...enhancers,
    )
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

