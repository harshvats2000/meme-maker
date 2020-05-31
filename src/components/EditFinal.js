import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

class EditFinal extends Component {

    handleDelete = e => {
        this.props.relatedTags.forEach((tag, i) => {
            var ref = firebase.firestore().collection('tags').doc(tag).collection('shayaris').where('title', '==' , this.props.title);
            ref.get()
            .then(snap => {
                snap.forEach(doc => {
                    doc.ref.delete()
                    .then(() => {
                        firebase.firestore().collection('tags').doc(tag).update({
                            totalShayaris: firebase.firestore.FieldValue.increment(-1)
                        })
                        .then(() => {
                            firebase.firestore().collection('tags').doc(tag).get()
                            .then(doc => {
                                if(doc.data().totalShayaris === 0){
                                    firebase.firestore().collection('tags').doc(tag).delete()
                                }
                            })
                            .then(() => {
                                var ref = firebase.firestore().collection('poets').doc(this.props.poet)
                                ref.get()
                                .then(doc => {
                                    if(i === this.props.relatedTags.length-1){
                                        //if sher > 0
                                        if(doc.data().sher > 0) {
                                            ref.collection('sher').where('title', '==', this.props.title).get()
                                            .then(snap => {
                                                snap.forEach(doc => {
                                                    ref.collection('sher').doc(doc.id).delete()
                                                })
                                            })
                                            .then(() => {
                                                ref.update({
                                                    sher: firebase.firestore.FieldValue.increment(-1)
                                                })
                                                .then(() => {
                                                    this.props.closeEditing()
                                                })
                                            })
                                        }
                                        //if ghazal > 0
                                        if(doc.data().ghazal > 0) {
                                            ref.collection('ghazal').where('title', '==', this.props.title).get()
                                            .then(snap => {
                                                snap.forEach(doc => {
                                                    ref.collection('ghazal').doc(doc.id).delete()
                                                })
                                            })
                                            .then(() => {
                                                ref.update({
                                                    ghazal: firebase.firestore.FieldValue.increment(-1)
                                                })
                                                .then(() => {
                                                    this.props.closeEditing()
                                                })
                                            })
                                        }
                                        //if poems > 0
                                        if(doc.data().poems > 0) {
                                            ref.collection('poems').where('title', '==', this.props.title).get()
                                            .then(snap => {
                                                snap.forEach(doc => {
                                                    ref.collection('poems').doc(doc.id).delete()
                                                })
                                            })
                                            .then(() => {
                                                ref.update({
                                                    poems: firebase.firestore.FieldValue.increment(-1)
                                                })
                                                .then(() => {
                                                    this.props.closeEditing()
                                                })
                                            })
                                        }
                                    }
                                })
                            })
                        })
                    })
                    .catch(err => {
                        alert(err.message)
                    })
                })
            })
        })
    }

    render() {
        const { title, content, relatedTags } = this.props;
        return (
            <div>
                <div id='editTitle'>{title}</div>
                <div id='editContent'>{content}</div>
                <div>{relatedTags.join(', ')}</div>
                <button onClick={e => this.handleDelete(e)}>Delete</button>
            </div>
        )

    }
}

export default EditFinal