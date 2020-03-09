
export const CREATE_USER = 'CREATE_USER'
export const createUser = (firstName, lastName, username, password, email) => {
    return async dispatch => {
      // any async code you want!

// EXAMPLE!!!!
// `https://firestore.googleapis.com/v1beta1/projects/mobilepassport-7f862/databases/(default)/documents/Trips/cA79Nvy9Z3wy56Zdr0rg?key=AIzaSyAFOAEEX-gIyLbHCdhSIfOrFAAZ2QQVMwQ`

      const response = await fetch('https://firestore.googleapis.com/v1beta1/projects/mobilepassport-7f862/databases/(default)/documents/lW9JzDPVUTiMIKjkecqW?key=AIzaSyAFOAEEX-gIyLbHCdhSIfOrFAAZ2QQVMwQ.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password
        })
      });

      const resData = await response.json();
      console.log(resData)
      // dispatch({
      //   type: CREATE_USER,
      //   UserData: {
      //     id: resData.name,
      //     firstName,
      //     lastName,
      //     username,
      //     email,
      //     password
      //   }
      // });
    };
  };