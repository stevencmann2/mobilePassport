export const ADD_TRIPS = 'ADD_TRIPS';
export const TRIP_LOCATION = 'TRIP_LOCATION'

export const addTrips = (tripName, departing, destination, returning, totalBudget) => {
    return dispatch => {
        const tripData = {
            TripName: tripName,
            Destination: destination, 
            Returning: returning, 
            Departing: departing, 
            TotalBudget: totalBudget,
        };
        fetch("https://firestore.googleapis.com/v1/projects/mobilepassport-7f862/databases/(default)/documents/Trips?key=AIzaSyAFOAEEX-gIyLbHCdhSIfOrFAAZ2QQVMwQ", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripData)
        })
        .catch(err => console.log(err))
        .then(parsedRes => {
            console.log(parsedRes);
        });
    };
};

