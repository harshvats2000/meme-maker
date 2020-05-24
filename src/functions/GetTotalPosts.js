import firebase from 'firebase/app'
import 'firebase/firestore'

export default function GetTotalPosts() {
    var ref = firebase.firestore().collection('tags')
    ref.get()
    .then(snap => {
      var titleArray = []
      snap.forEach(doc => {
        ref.doc(doc.id).collection('shayaris').get()
        .then(snap => {
          snap.forEach(doc => {
            var title = doc.data().title
            if(titleArray.indexOf(title) === -1) {
              titleArray.push(title)
              console.log(titleArray.length)
            }
          })
        })
      })
    })
    return 1
}
