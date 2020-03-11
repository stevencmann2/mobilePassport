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


// if (window && window.location && window.location.hostname === 'localhost') {

//     const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

//     if (typeof devToolsExtension === 'function') {
//         enhancers.push(devToolsExtension());
//     }
// }

let composeEnhancers = compose;
if(__DEV__) {
    composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

console.log('-------ENHANCERS------')
console.log(enhancers)

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware),
        ...enhancers,
    )
);
console.log(store)

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

