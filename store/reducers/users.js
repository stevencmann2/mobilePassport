import Users, { CREATE_USER, createUser } from '../actions/users'


const initialState = ({});

const CreateNewUser = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_USER:
        const newUser = new User(
          action.UserData.id,
          'u1',
          action.UserData.firstName,
          action.UserData.lastName,
          action.UserData.username,
          action.UserData.email,
          action.UserData.password
        );
        return {
            state
        };
    }

}

export default createUser;