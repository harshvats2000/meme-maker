import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'

class SearchPoet extends Component {
    constructor() {
        super()
        this.state = {
            poet: '',
            poetArray: [],
            filteredList: [],
            fetching: true
        }
    }

    componentDidMount() {
        var poetArray = []
        var ref = firebase.firestore().collection('poets')
        ref.orderBy('english_name').get()
        .then(snap => {
            snap.forEach(doc => {
                poetArray.push(doc.data().english_name)
            })
            this.setState({ 
                poetArray: poetArray,
                filteredList: poetArray,
                fetching: false
            })
        })
    }

    handlePoetChange = (e) => {
        this.setState({
            poet: e.target.value,
            filteredList: this.state.poetArray.filter(poet => {
                return poet.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0
            })
        })
    }

    render() {
        const { poet, poetArray, filteredList, fetching } = this.state;
        const { theme } = this.props;
        const poetInputStyle = {
            textAlign: 'center',
            padding: '15px'
        }
        const poetLinkStyle = {
            textDecoration: 'none',
        }
        const darkPoetLinkStyle = {
            textDecoration: 'none',
            color: 'white'
        }
        const poetListStyle = {
            padding: '10px'
        }
        const lightInputStyle = {
            padding: '10px',
            fontSize: '18px',
            border: 'none'
        }
        const darkInputStyle = {
            padding: '10px',
            fontSize: '18px',
            backgroundColor: '#363537',
            caretColor: 'crimson',
            border: 'none',
            color: 'white'
        }
        return (
            <div>
                {
                    fetching ? null :
                    <h2 style={{textAlign: 'center', marginBottom: 0}}>
                        {Math.floor(poetArray.length/10)*10}+ Writers
                    </h2>
                }
                <div style={poetInputStyle}>
                    <input placeholder='search writer...'
                    autoFocus
                    style={theme === 'light' ? lightInputStyle : darkInputStyle}
                    value={poet}
                    onChange={this.handlePoetChange}></input>
                </div>
                <hr/>
                <div>
                    {
                        filteredList.map((poet, i) => {
                            return (
                            <div key={i} style={poetListStyle}>
                                <Link style={theme === 'light' ? poetLinkStyle : darkPoetLinkStyle} to={`/poet/${poet}/`}>{poet}</Link>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(SearchPoet)