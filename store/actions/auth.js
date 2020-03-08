import { auth } from "react-native-firebase";

export const SIGNUP = 'SIGNUP';

export const signup = (email, password) => {
    return async dispatch => {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAFOAEEX-gIyLbHCdhSIfOrFAAZ2QQVMwQ',
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
                throw new Error ('Something went wrong!');
            }

            const resData = await response.json();
            console.log(resData);
        dispatch({ type: SIGNUP });
    };
};

export default authAction;