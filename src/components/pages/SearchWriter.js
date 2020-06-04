import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Link, withRouter } from 'react-router-dom'

class SearchPoet extends Component {
    constructor() {
        super()
        this.state = {
            poet: '',
            poets: [],
            filteredList: []
        }
    }

    componentDidMount() {
        this.fetchPoets()
    }

    fetchPoets = () => {
        var poets = [];
        firebase.firestore().collection('poets').get()
        .then(snap => {
            snap.forEach(doc => {
                poets.push(doc.data().english_name)
            })
            this.setState({
                poets: poets,
                filteredList: poets
            })
        })
    }

    handlePoetChange = (e) => {
        var poets = this.state.poets;
        this.setState({
            poet: e.target.value,
            filteredList: poets.filter(poet => {
                return poet.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0
            })
        })
    }

    render() {
        const { poet, poets, filteredList } = this.state;
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
                    <h2 style={{textAlign: 'center', marginBottom: 0}}>
                        {Math.floor(poets.length/10)*10}+ Writers
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