import { FETCH_TAGPAGE_SHAYARIS } from './types'
import firebase from 'firebase/app'
import 'firebase/firestore'

export const fetchTagPageShayaris = (tag) => dispatch => {

    var tagPageShayaris = [];

    firebase.firestore().collection('tags').doc(tag).collection('shayaris').orderBy('timestamp', 'desc').get()
    .then(snap => {
      snap.forEach(doc => {
        tagPageShayaris.push(doc.data())
      })

        dispatch({
            type: FETCH_TAGPAGE_SHAYARIS,
            payload: tagPageShayaris
        })
    })
}