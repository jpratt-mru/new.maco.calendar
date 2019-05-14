import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR_60ldSP455BFETkjRFmLoTOp82ZjWTM",
  authDomain: "maco-calendar-prototype.firebaseapp.com",
  databaseURL: "https://maco-calendar-prototype.firebaseio.com",
  projectId: "maco-calendar-prototype",
  storageBucket: "maco-calendar-prototype.appspot.com",
  messagingSenderId: "590992828617",
  appId: "1:590992828617:web:6c5cea4faadc70d5"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
