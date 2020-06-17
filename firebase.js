const firebase = require('firebase/app')
const firebaseConfig = require('./local.config').firebaseConfig;

const app = firebase.initializeApp(firebaseConfig);
const analitics = firebase.analytics();
const store = firebase.firestore();

const games = store.collection("games");
