import firebase from "firebase/app";
import "firebase/firestone";

if (firebase.apps.length === 0) {
    firebase.initializeApp({
        projectId: "mobilepassport-7f862"
    });
}

const db = firebase.firestore();

export default db;