import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'

class PoetPage extends Component {
    constructor() {
        super()
        this.state = {
            poet: '',
            poetNameEnglish: '',
            sher: 0,
            ghazal: 0,
            poems: 0
        }
    }

    handlePoetChange = (e) => {
        this.setState({
            poet: e.target.value,
            poetNameEnglish: ''
        })
    }

    searchPoet = () => {
        var ref = firebase.firestore().collection('poets').where('english_name', '==', this.state.poet.trim())
        ref.get()
        .then(snap => {
            snap.forEach(doc => {
                console.log(doc.data());
                var poems = doc.data().poems
                var sher = doc.data().sher
                var ghazal = doc.data().ghazal
                if(poems > 0) {
                    this.setState({
                        poems: poems
                    })
                }
                if(sher > 0) {
                    this.setState({
                        sher: sher
                    })
                }
                if(ghazal > 0) {
                    this.setState({
                        ghazal: ghazal
                    })
                }
                this.setState({
                    poetNameEnglish: doc.data().english_name
                })
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    render() {
        return (
            <div>
                <input placeholder='search poet...'
                value={this.state.poet}
                onChange={this.handlePoetChange}></input>
                <button onClick={this.searchPoet}>search</button>
                {
                    !this.state.poetNameEnglish ? 
                    null : 
                    <div className='poet-container'>
                        <div className='poet-name-english'>{this.state.poetNameEnglish}</div>
                        {
                            !this.state.sher ? null : <Link to={`/poet/${this.state.poetNameEnglish}/sher`}>Sher</Link>
                        }
                        {
                            !this.state.sher ? null : <Link to={`/poet/${this.state.poetNameEnglish}/ghazal`}>Ghazal</Link>
                        }
                        {
                            !this.state.sher ? null : <Link to={`/poet/${this.state.poetNameEnglish}/sher`}>Poems</Link>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default PoetPage