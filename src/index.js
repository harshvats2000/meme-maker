import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDNUqtCtU8vr7ureS57yQ7k6iuJoP4rtz0",
    authDomain: "bestshayari-d83c1.firebaseapp.com",
    databaseURL: "https://bestshayari-d83c1.firebaseio.com",
    projectId: "bestshayari-d83c1",
    storageBucket: "bestshayari-d83c1.appspot.com",
    messagingSenderId: "354801526205",
    appId: "1:354801526205:web:740bd271ebe3e3cf4a1ed4",
    measurementId: "G-BQWN4W2VND"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
