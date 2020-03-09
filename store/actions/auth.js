
import { AsyncStorage } from "react-native";
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT'


export const signup = (email, password) => {
    return async dispatch => {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFOAEEX-gIyLbHCdhSIfOrFAAZ2QQVMwQ',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                }
            );

            if (!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                let message = 'Something went wrong!';
                    if (errorId === 'EMAIL_EXISTS') {
                        message = 'This email exists already, please use a different email or navigate to the LogIn Screen!';
                    }
                 throw new Error(message);
            }
            const resData = await response.json();
            console.log(resData);
            dispatch({ 
                type: SIGNUP, 
                token: resData.idToken, 
                userId: resData.localId,
                
                
            });
            
                  
    };
};




////// FOR LOGIN


export const login = (email, password) => {
    return async (dispatch, getState) => {
        console.log(getState())
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFOAEEX-gIyLbHCdhSIfOrFAAZ2QQVMwQ',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                }
            );

            if (!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                let message = 'Something went wrong!';
                if (errorId === 'EMAIL_NOT_FOUND') {
                  message = 'It appears that this email is not in our system, please check your spelling!';
                } else if (errorId === 'INVALID_PASSWORD') {
                  message = 'This password is not valid, please check spelling!';
                }
                throw new Error(message);
            }

            const resData = await response.json();
            console.log(resData);
        dispatch({ 
            type: LOGIN,  
            token: resData.idToken, 
            userId: resData.localId,
            
        });
        console.log(getState)
        
    };
};

/// logout
 
export const logout = () =>{
    return{ type: LOGOUT }

}

