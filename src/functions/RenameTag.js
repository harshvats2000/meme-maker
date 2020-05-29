import firebase from 'firebase/app'
import 'firebase/firestore'

export default function RenameTag(props) {
    var ref = firebase.firestore().collection('tags')
    ref.doc(props.from).get()
    .then(doc => {
      ref.doc(props.to).set({
        totalShayaris: doc.data().totalShayaris
      })
      .then(() => {
        ref.doc(props.from).collection('shayaris').get()
        .then(snap => {
          snap.forEach(doc => {
            ref.doc(props.to).collection('shayaris').doc(doc.id).set({
              title: doc.data().title,
              content: doc.data().content,
              poet: doc.data().poet,
              english_name: doc.data().english_name,
              tags: doc.data().tags,
              timestamp: doc.data().timestamp
            })
          })
        })
      })
    })
    .then(() => {
        ref.doc(props.from).delete()
        .then(() => {
          ref.get()
          .then(snap => {
            snap.forEach(doc => {
              var ref2 = ref.doc(doc.id)
              ref2.get()
              .then(doc => {
                ref2.collection('shayaris').get()
                .then(snap => {
                  snap.forEach(doc => {
                    var tagsArray = doc.data().tags
                    var index = tagsArray.indexOf(props.from)
                    if(index > -1){
                      tagsArray[index] = props.to;
                      ref2.collection('shayaris').doc(doc.id).update({
                        tags: tagsArray
                      })
                    }
                  })
                })
              })
            })
          })
        })
      })
      .then(() => {
          console.log('done');
      })
    return 1
}
