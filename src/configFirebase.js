import firebase from 'firebase'
import Rebase from 're-base'
require("@firebase/firestore")

const config = {
    apiKey: "AIzaSyAvgTvNQcW8FDc0dmKPnq3mzsqWMCPfOQg",
    authDomain: "desafio-mega.firebaseapp.com",
    databaseURL: "https://desafio-mega.firebaseio.com",
    projectId: "desafio-mega",
    storageBucket: "desafio-mega.appspot.com",
    messagingSenderId: "948437724333"
  };

  configFirebase = firebase.initializeApp(config);

  export const db = firebase.firestore();
  export const base = Rebase.createClass(configFirebase.firestore());
