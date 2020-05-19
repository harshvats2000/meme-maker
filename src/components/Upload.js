import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase'
import '../styles/Upload.css'

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authenticated: false,
            password: '',
            title: '',
            content: '',
            poet: '',
            tags: [],
            newTagInput: false,
            newTagInputValue: '',
            uploading: false
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
        this.setState(prev => ({
            tags: e.target.value
        }))
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleContentChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    handlePoetChange = (e) => {
        this.setState({
            poet: e.target.value
        })
    }

    upload = () => {
        var tags = this.state.tags;
        var title = this.state.title;
        var content = this.state.content;
        var poet = this.state.poet;
        if(tags){
            if(title){
                if(content){
                    this.setState({
                        uploading: true
                    })
                    if(this.state.newTagInputValue !== ''){                 //there is a new tag
                        this.setState(prev => ({
                            tags: [...prev.tags, this.state.newTagInputValue]
                        }))
                        firebase.firestore().collection('tags').doc(this.state.newTagInputValue).set({
                            totalShayaris: 0
                        })
                        .then(() => {
                            //upload
                            this.state.tags.forEach((tag, i) => {
                                firebase.firestore().collection('tags').doc(tag).update({
                                    totalShayaris: firebase.firestore.FieldValue.increment(1)
                                })
                                .then(() => {
                                    firebase.firestore().collection('tags').doc(tag).collection('shayaris').doc().set({
                                        title: title,
                                        content: content,
                                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                        tags: this.state.tags,
                                        poet: poet
                                    })
                                    .then(() => {
                                        if(i === this.state.tags.length-1){
                                            this.setState({
                                                title: '',
                                                content: '',
                                                poet: '',
                                                tags: [],
                                                newTagInput: false,
                                                newTagInputValue: '',
                                                uploading: false
                                            })
                                            alert('uploaded');
                                        }
                                    })
                                })
                                .catch(err => {
                                    alert('cannot upload due to some error.')
                                })
                            })
                        })
                    } else {                    //there is no new tag
                        this.state.tags.forEach((tag, i) => {
                            firebase.firestore().collection('tags').doc(tag).update({
                                totalShayaris: firebase.firestore.FieldValue.increment(1)
                            })
                            .then(() => {
                                firebase.firestore().collection('tags').doc(tag).collection('shayaris').doc().set({
                                    title: title,
                                    content: content,
                                    poet: poet,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    tags: this.state.tags,
                                })
                                .then(() => {
                                    if(i === this.state.tags.length-1){
                                        this.setState({
                                            title: '',
                                            content: '',
                                            poet: '',
                                            tags: [],
                                            newTagInput: false,
                                            newTagInputValue: '',
                                            uploading: false
                                        })
                                        alert('uploaded');
                                    }
                                })
                            })
                            .catch(err => {
                                alert('cannot upload due to some error.')
                            })
                        })   
                    }
                }else {
                    alert('error')
                }
            } else {
                alert('error')
            }
        }else {
            alert('error')
        }
    }

    showNewTagInput = () => {
        this.setState({
            newTagInput: !this.state.newTagInput
        })
    }

    handleNewTag = (e) => {
        this.setState({
            newTagInputValue: e.target.value
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

    render() {
        return (
            !this.state.authenticated 
            ? <input placeholder='password' onChange={(e) => this.authMe(e)}></input>
            :
            <div style={{textAlign: 'center'}}>
                <FormControl>
                    <InputLabel htmlFor="select-multiple-chip">Tag</InputLabel>
                    <Select
                      multiple
                      value={this.state.tags}
                      onChange={e => this.handleTagChange(e)}
                      input={<Input id="select-multiple-checkbox" />}
                      renderValue={selected => selected.join(', ')}
                    >
                        {this.props.tags.map(tag => (
                          <MenuItem key={tag} value={tag}>
                          <Checkbox checked={this.state.tags.indexOf(tag) > -1} />
                          <ListItemText primary={tag} />
                          </MenuItem>
                        ))}
                    </Select>
                    <button className='newTagBtn' onClick={this.showNewTagInput}>New Tag</button>

                    {
                        this.state.newTagInput ?
                        <TextField
                            label="New Tag"
                            placeholder="type your tag"
                            value={this.state.newTagInputValue.toLowerCase()}
                            onChange={this.handleNewTag}
                          /> :
                          null
                    }
                  <TextField
                      label="Title"
                      placeholder="Choose title wisely"
                      margin="normal"
                      value={this.state.title}
                      onChange={e => this.handleTitleChange(e)}
                    />
                  <TextField
                      label="Content"
                      placeholder="Write beyond imagination"
                      multiline
                      margin="normal"
                      value={this.state.content}
                      onChange={e => this.handleContentChange(e)}
                    />
                  <TextField
                      label="Poet"
                      placeholder="Poet"
                      margin="normal"
                      value={this.state.poet}
                      onChange={e => this.handlePoetChange(e)}
                    />
                    <button type='submit' onClick={this.upload} className='uploadBtn' disabled={this.state.uploading}>Upload</button>
                </FormControl>
            </div>
        )
    }
}

export default Upload