//Importação para utilização do Firebase
import firebase from 'firebase'

//Importação para utilização do Re-base
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

//Armazena as configurações do app do firebase em uma variavél
configFirebase = firebase.initializeApp(config);

//Armazena as configurações do app do fireStore em uma variavél com auxilio do rebase
export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true })
export const base = Rebase.createClass(configFirebase.firestore());
