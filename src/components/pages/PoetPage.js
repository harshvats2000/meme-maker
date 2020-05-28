import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import PoetWritings from '../PoetWritings'

class PoetPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            poet: props.match.params.poet,
            fetching: true,
            poet_hindi: '',
            sher: 0,
            ghazal: 0,
            poems: 0,
            sherObject: [],
            poemsObject: [],
            ghazalObject: []
        }
    }

    fetchWritings = () => {
        var poems = 0;
        var sher = 0;
        var ghazal = 0;
        var docId = '';
        var sherObject = {}
        var poemsObject = {}
        var ghazalObject = {}
        var ref = firebase.firestore().collection('poets').where('english_name', '==', this.state.poet.trim())
        ref.get()
        .then(snap => {
            snap.forEach(doc => {
                poems = doc.data().poems
                sher = doc.data().sher
                ghazal = doc.data().ghazal
                docId = doc.id

                    if(poems > 0) this.setState({ poems: poems })
                    if(sher > 0) this.setState({ sher: sher })
                    if(ghazal > 0) this.setState({ ghazal: ghazal })

                    this.setState({ 
                        poet: doc.data().english_name,
                        poet_hindi: doc.id 
                    })
                })
            })
        .then(() => {
            var ref = firebase.firestore().collection('poets').doc(docId)
            if(sher > 0) {
                ref.collection('sher').orderBy('timestamp', 'desc').get()
                .then(snap => {
                    var i = 0;
                    snap.forEach(doc => {
                        sherObject[i] = doc.data()
                        i++;
                    })
                })
                .then(() => {
                    this.setState({sherObject: sherObject})
                })
            }
            if(ghazal > 0) {
                ref.collection('ghazal').orderBy('timestamp', 'desc').get()
                .then(snap => {
                    var i = 0;
                    snap.forEach(doc => {
                        ghazalObject[i] = doc.data()
                        i++;
                    })
                })
                .then(() => {
                    this.setState({ghazalObject: ghazalObject})
                })
            }
            if(poems > 0) {
                ref.collection('poems').orderBy('timestamp', 'desc').get()
                .then(snap => {
                    var i = 0;
                    snap.forEach(doc => {
                        poemsObject[i] = doc.data()
                        i++;
                    })
                })
                .then(() => {
                    this.setState({poemsObject: poemsObject})
                })
            }
        })
        .then(() => {
            this.setState({fetching: false})
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        window.scrollTo(0, 0)
        if(prevProps.match.params.poet !== this.props.match.params.poet) {
            this.setState({
                poet: this.props.match.params.poet
            }, () => {
                this.fetchWritings();
            })
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.fetchWritings()
    }

    render() {
        const { poet, poet_hindi, fetching, sher, ghazal, poems, sherObject, ghazalObject, poemsObject } = this.state;
        const { theme } = this.props;
        const poetNameStyle = {
            fontSize: '23px',
            padding: '15px',
            textAlign: 'center',
        }
        return (
            <div>
                <div style={poetNameStyle}>
                    {poet_hindi}
                </div>
                {
                    !this.state.poet ? 
                    null : 
                    <div className='poet-container'>
                        {
                            !poet ? null :
                            <PoetWritings fetching={fetching} sher={sher} ghazal={ghazal} poems={poems} sherObject={sherObject} ghazalObject={ghazalObject} poemsObject={poemsObject} theme={theme} />
                        }
                    </div>
                }
                <hr/>
            </div>
        )
    }
}

export default withRouter(PoetPage)