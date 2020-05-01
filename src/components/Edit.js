import React, { Component } from 'react'
import firebase from 'firebase'

class Edit extends Component {
    constructor(props){
        super(props)
        this.state = {
            tag: '',
            title: [],
            content: [],
            id: [],
            authenticated: true,
            password: '',
            editing: false,
            editingTitle: '',
            editingContent: ''
        }
    }

    componentDidMount(){
        firebase.firestore().collection('users').doc('auth').get()
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
        firebase.firestore().collection('tags').doc(this.state.tag).collection('shayaris').get()
        .then(snap => {
            snap.forEach(doc => {
                this.setState(prev => ({
                    title: [...prev.title, doc.data().title],
                    content: [...prev.content, doc.data().content],
                    id: [...prev.id, doc.id]
                }))
            })
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

    handleEdit = (i) => {
        this.setState({
            editing: true
        })
        var title = document.getElementsByClassName(`div${i}`)[0];
        var content = document.getElementsByClassName(`div${i}`)[1];
        title.contentEditable = true;
        content.contentEditable = true;
    }

    handleSave = (i) => {
        this.setState({
            editing: false
        })
        var title = document.getElementsByClassName(`div${i}`)[0];
        var content = document.getElementsByClassName(`div${i}`)[1];
        title.contentEditable = false;
        content.contentEditable = false;
        console.log(this.state.id[i]);
        firebase.firestore().collection('tags').doc(this.state.tag).collection('shayaris').doc(this.state.id[i]).update({
            title: title.innerHTML,
            content: content.innerHTML
        })
    }

    render() {
        return (
            !this.state.authenticated 
            ? <input placeholder='password' onChange={(e) => this.authMe(e)}></input>
            :
            <div>
                <select value={this.state.tag} onChange={e => this.handleTagChange(e)}>
                    {
                        <option value=''>--select an option--</option>
                    }
                    {
                        this.props.tags.map((tag, i) => (
                            <option key={i} value={tag}>{tag}</option>
                        ))
                    }
                </select>
                <button onClick={this.fetchPosts} disabled={!this.state.tag}>Fetch posts</button>
                {
                    this.state.title.map((title, i) => {
                        return (
                            <React.Fragment key={title}>
                            <div>
                                {
                                    this.state.editing
                                    ? <div>
                                        <span onClick={e => this.handleSave(i)}>save</span>
                                        <span>discard</span>
                                    </div>
                                    : <React.Fragment>
                                    <div>
                                        <span onClick={e => this.handleEdit(i)}>Edit</span>
                                    </div>
                                    </React.Fragment> 
                                }
                                <div className={`div${i}`}>{title}</div>
                                <br/>
                                <div className={`div${i}`}>{this.state.content[i]}</div>
                            </div>
                            <hr/>
                            </React.Fragment>
                        )
                    })
                }

            </div>
        )
    }
}

export default Edit