import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import { BrowserRouter } from 'react-router-dom'

var firebaseConfig = {
    apiKey: "AIzaSyCEMfOB5_j1hIdpxVXOduBuUMTwj5txVZo",
    authDomain: "bestshayari-7f672.firebaseapp.com",
    databaseURL: "https://bestshayari-7f672.firebaseio.com",
    projectId: "bestshayari-7f672",
    storageBucket: "bestshayari-7f672.appspot.com",
    messagingSenderId: "1001640034721",
    appId: "1:1001640034721:web:251a9065628579fe518be0",
    measurementId: "G-EQP9800NT3"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
