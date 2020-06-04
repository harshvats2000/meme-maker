import { FETCH_HOMEPAGE_SHAYARIS } from './types'
import firebase from 'firebase/app'
import 'firebase/firestore'

export const fetchHomePageShayaris = () => dispatch => {

    var homePageShayaris = [];

    firebase.firestore().collection('tags').doc('sher').collection('shayaris').orderBy('timestamp', 'desc').limit(12).get()
    .then(snap => {
      snap.forEach(doc => {
        homePageShayaris.push(doc.data())
      })

        dispatch({
            type: FETCH_HOMEPAGE_SHAYARIS,
            payload: [homePageShayaris, false]        //fetching is false
        })
    })
}