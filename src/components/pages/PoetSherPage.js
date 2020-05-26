import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'

class PoetSherPage extends Component {
    componentDidMount() {
        var poet = this.props.match.params
        firebase.firestore().collection('poets').where('english_name', '==', poet).get()
        .then(snap => {
            snap.forEach(doc => {
                // doc.poems
            })
        })
    }
    render() {
        return (
            <div>
                PoetSherPage
            </div>
        )
    }
}

export default withRouter(PoetSherPage)