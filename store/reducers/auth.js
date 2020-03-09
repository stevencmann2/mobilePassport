import { LOGIN, SIGNUP } from "../actions/auth"

const initialState ={
    token: null,
    userId: null, 
    loggedIn: false,
}

export default (state=initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return{
                token: action.token,
                userId: action.userId,
                loggedIn: action.loggedIn
            }
        case SIGNUP:
            return{
                token: action.token,
                userId: action.userId, 
                loggedIn: action.loggedIn
            }
        default: 
            return state;
    }
}