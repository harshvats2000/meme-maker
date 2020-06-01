import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import PoetWritings from '../PoetWritings'
import ShareIcon from '@material-ui/icons/Share';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import no_profile_pic from '../../images/no_profile_pic.jpeg'

class PoetPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            poet: props.match.params.poet,
            pic_url: '',
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
    
    componentDidMount() {
        window.scrollTo(0, 0)
        this.fetchWritings()
        window.addEventListener('scroll', this.scrollToTop)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollToTop)
    }

    componentDidUpdate(prevProps, prevState) {
        window.scrollTo(0, 0)
        if(prevProps.match.params.poet !== this.props.match.params.poet) {
            this.setState({
                poet: this.props.match.params.poet
            }, () => {
                this.setState({
                    sher: 0,
                    ghazal: 0,
                    poems: 0,
                    sherObject: [],
                    poemsObject: [],
                    ghazalObject: []
                })
                this.fetchWritings();
            })
        }
    }

    scrollToTop = () => {
        var element = document.getElementById('scroll-btn')
        if(window.pageYOffset > 232) {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
    }
    

    handleShare = () => {
        if(navigator.share) {
            navigator.share({
                title: `Take a look at all of the writings of ${this.props.match.params.poet}.`,
                url: window.location.href
            })
        } else {
            console.log('no')
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
                        poet_hindi: doc.id,
                        pic_url: doc.data().pic_url
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


    render() {
        const { poet, poet_hindi, fetching, sher, ghazal, poems, sherObject, ghazalObject, poemsObject } = this.state;
        const { theme } = this.props;
        const poetNameStyle = {
            fontSize: '23px',
            padding: '15px',
            textAlign: 'center',
        }
        const profile_pic_style = {
            height: '120px',
            width: '120px',
            borderRadius: '50%',
            marginTop: '15px',
            verticalAlign: 'middle',
            position: 'relative',
            left: '12px'
        }
        const share_btn_style = {
            position: 'relative',
            left: '30px'
        }
        const scroll_btn_style = {
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            display: 'none',
            fontSize: '30px'
        }
        return (
            <div>
                <div>
                    <div style={{textAlign: 'center'}}>
                        <img src={this.state.pic_url ? this.state.pic_url : no_profile_pic} alt='writer_profile_pic' style={profile_pic_style} />
                        <ShareIcon style={share_btn_style} onClick={this.handleShare} />
                    </div>
                    <div style={poetNameStyle}>
                        {poet_hindi}
                    </div>
                </div>
                {
                    !this.state.poet ? 
                    null : 
                    <div className='poet-container'>
                        {
                            !poet ? null :
                            <PoetWritings 
                            fetching={fetching} 
                            poetEnglish={poet}
                            poetHindi={poet_hindi}
                            sher={sher} 
                            ghazal={ghazal} 
                            poems={poems} 
                            sherObject={sherObject} 
                            ghazalObject={ghazalObject} 
                            poemsObject={poemsObject} 
                            theme={theme} />
                        }
                    </div>
                }
                <hr/>
                
                <ArrowUpwardIcon 
                id='scroll-btn'
                style={scroll_btn_style} 
                onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth'})} />
            </div>
        )
    }
}

export default withRouter(PoetPage)