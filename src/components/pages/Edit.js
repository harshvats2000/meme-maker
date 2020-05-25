import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import EditFinal from '../EditFinal';
import SnackbarContainer from '../../container/Snackbar';

class Edit extends Component {
    constructor(props){
        super(props)
        this.state = {
            tag: '',
            title: [],
            content: [],
            timestamp: [],
            id: [],
            authenticated: false,
            password: '',
            relatedTags: {},
            editing: false,
            i: -1,
            open: false,
            message: ''
        }
    }

    componentDidMount(){
        firebase.firestore().collection('password').doc('auth').get()
        .then(doc => {
            this.setState({
                password: doc.data().password
            })
        })
    }
    
    handleTagChange = (e) => {
        this.setState({
            tag: e.target.value
        })
    }

    fetchPosts = () => {
        var titleArray = [];
        var contentArray = [];
        var idArray = [];
        var timestampArray = [];
        var tempTagsObject = {};
        firebase.firestore().collection('tags').doc(this.state.tag).collection('shayaris').get()
        .then(snap => {
            var i = 0;
            snap.forEach(doc => {
                titleArray.push(doc.data().title)
                contentArray.push(doc.data().content)
                idArray.push(doc.id)
                timestampArray.push(doc.data().timestamp)
                Object.assign(tempTagsObject, {
                    [i]: doc.data().tags
                })
                i++;
            })
            this.setState(prev => ({
                title: titleArray,
                content: contentArray,
                timestamp: timestampArray,
                id: idArray,
                relatedTags: tempTagsObject
            }))
        })
    }

    authMe = (e) => {
        if(this.state.password !== ''){
            if(this.state.password === e.target.value) {
                this.setState({
                    authenticated: true
                })
            }
        }
    }

    closeEditing = () => {
        this.setState({
            editing: false,
            open: true,
            message: 'successfully deleted',
            title: [],
            content: [],
            id: [],
            relatedTags: {}
        })
    }

    handleSnackbarClose = () => {
        this.setState({
            open: false,
            message: ''
        })
    }

    render() {
        const { i, title, content, relatedTags, id, timestamp, tag} = this.state;
        return (
            !this.state.authenticated 
            // ? <input placeholder='password' onChange={(e) => this.authMe(e)}></input>
            ? <h3>Under maintainance for some time</h3>
            :
            this.state.editing
            ? <EditFinal tag={tag} relatedTags={relatedTags[i]} title={title[i]} content={content[i]} timestamp={timestamp[i]} id={id[i]} closeEditing={this.closeEditing} />
            : <div>
            <select value={tag} onChange={e => this.handleTagChange(e)}>
                {
                    <option value=''>--select a tag--</option>
                }
                {
                    this.props.tags.map((tag, i) => (
                        <option key={i} value={tag}>{tag}</option>
                    ))
                }
            </select>
            <button onClick={this.fetchPosts} disabled={!tag}>Fetch posts</button>

            {
                title.map((title, i) => {
                    return (
                        <React.Fragment key={i}>
                        <div className={`div${i}`} onClick={(e) => this.setState({editing: true, i: i})}>
                            <div className={`div${i}`}>{title}</div>
                            <br/>
                            <div className={`div${i}`}>{content[i]}</div>
                            <div>{relatedTags[i].join(', ')}</div>
                        </div>
                        <hr/>
                        </React.Fragment>
                    )
                })
            }
            <SnackbarContainer open={this.state.open} message={this.state.message} handleClose={this.handleSnackbarClose} />
        </div>
        )
    }
}

export default Edit