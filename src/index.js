import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBsnFSb7My_vFvacFd0339ox6A5bUPFce4",
    authDomain: "bestshayari-5488b.firebaseapp.com",
    databaseURL: "https://bestshayari-5488b.firebaseio.com",
    projectId: "bestshayari-5488b",
    storageBucket: "bestshayari-5488b.appspot.com",
    messagingSenderId: "511754199348",
    appId: "1:511754199348:web:a21087e96521cbb2458561",
    measurementId: "G-CREGF47K5K"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
