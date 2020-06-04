import { FETCH_POETPAGE_SHAYARIS } from '../actions/types'
import firebase from 'firebase/app'
import 'firebase/firestore'

export const fetchPoetPageShayaris = (poet_english) => dispatch => {
    var sher = [];
    var ghazal = [];
    var poems = [];
    var ref = firebase.firestore().collection('poets')
    ref.where('english_name', '==', poet_english).get()
    .then(snap => {
        snap.forEach(doc => {

            //fetch sher
            ref.doc(doc.id).collection('sher').get()
            .then(snap => {
                snap.forEach(doc => {
                    sher.push(doc.data())
                })
            })

            //fetch ghazal
            ref.doc(doc.id).collection('ghazal').get()
            .then(snap => {
                snap.forEach(doc => {
                    ghazal.push(doc.data())
                })
            })

            //fetch poems
            ref.doc(doc.id).collection('poems').get()
            .then(snap => {
                snap.forEach(doc => {
                    poems.push(doc.data())
                })
                dispatch({
                    type: FETCH_POETPAGE_SHAYARIS,
                    payload: [sher, ghazal, poems, doc.data().pic_url, false]               //fetching is false
                })
            })
        })
    })
}