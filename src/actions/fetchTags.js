import { FETCH_TAGS } from '../actions/types'
import firebase from 'firebase/app'
import 'firebase/firestore'

export const fetchTags = () => dispatch => {
    var tags = [];
    var totalShayaris = []
    firebase.firestore().collection('tags').get()
    .then(snap => {
        snap.forEach(doc => {
            tags.push(doc.id)
            totalShayaris.push(doc.data().totalShayaris)
        })
    })
    .then(() => dispatch({
        type: FETCH_TAGS,
        payload: [tags, totalShayaris]
    }))
}