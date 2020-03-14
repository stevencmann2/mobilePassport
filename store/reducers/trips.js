import { TRIPID } from "../actions/trips"

const initialState ={
    tripId: null  
}

export default (state=initialState, action) => {
    switch (action.type) {
        case TRIPID:
            return {
                ...state,
                id: action.tripId,
                }
        default: 
            return state;
    }
}