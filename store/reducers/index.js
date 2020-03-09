import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'
import createNewUser from './users'



const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    addUser: createNewUser
});

export default rootReducer;