import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app'
import 'firebase/firestore'
import '../styles/Upload.css'

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authenticated: true,
            password: '',
            title: '',
            content: '',
            poetEnglish: '',
            poetHindi: '',
            tags: [],
            newTagInput: false,
            newTagInputValue: '',
            disable: false,
            titleAvailable: true,
            tagAvailable: true,
            poets_english_arr: [],
            poets_hindi_arr: []
        }
    }

    componentDidMount(){
        firebase.firestore().collection('password').doc('auth').get()
        .then(doc => {
            this.setState({
                password: doc.data().password
            })
        })
        
        var poets_hindi_arr = [];
        var poets_english_arr = [];
        firebase.firestore().collection('poets').get()
        .then(snap => {
            snap.forEach(doc => {
                poets_english_arr.push(doc.data().english_name)
                poets_hindi_arr.push(doc.id)
            })
        })
        .then(() => {
            this.setState({
                poets_english_arr: poets_english_arr,
                poets_hindi_arr: poets_hindi_arr
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
            title: e.target.value,
            titleAvailable: true
        })
        this.props.tags.map(tag => {
            firebase.firestore().collection('tags').doc(tag).collection('shayaris').where('title', '==', e.target.value).get()
            .then(snap => {
                snap.forEach(doc => {
                    this.setState({
                        disable: false
                    })
                    if(doc.exists){
                        this.setState({
                            titleAvailable: false,
                        })
                    }
                })
            })
            .catch(err => {
                alert(err.message)
            })
        })
    }

    handleContentChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    handlePoetChange = e => {
        var index = this.state.poets_english_arr.indexOf(e.target.value);
        var poetHindi = this.state.poets_hindi_arr[index]
        this.setState({
            poetEnglish: e.target.value,
            poetHindi: poetHindi
        })
    }

    searchStringInArray = (str, strArray) => {
        for (var j=0; j<strArray.length; j++) {
            if (strArray[j].match(str)) return j;
        }
        return 0;
    }

    emptyAll = () => {
        this.setState({
            title: '',
            content: '',
            poetEnglish: '',
            poetHindi: '',
            tags: [],
            newTagInput: false,
            newTagInputValue: '',
            disable: false
        })
        alert('uploaded');
    }
    
    finalUpload = () => {
        var tags = this.state.tags;
        var title = this.state.title.trim();
        var content = this.state.content.trim();
        var poetHindi = this.state.poetHindi;
        var poetEnglish = this.state.poetEnglish;

        //loop through every tag to upload
        this.state.tags.forEach((tag, i) => {
            //first increment total shayaris of that tag
            firebase.firestore().collection('tags').doc(tag).update({
                totalShayaris: firebase.firestore.FieldValue.increment(1)
            })
            .then(() => {
                //set the document
                firebase.firestore().collection('tags').doc(tag).collection('shayaris').doc().set({
                    title: title,
                    content: content,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    tags: tags,
                    poet: poetHindi,
                    english_name: poetEnglish
                })
                .then(() => {
                    //if it is last round of the loop only then check if contains any of the three main category: sher, ghazal, poems
                    if(i === tags.length-1){
                        if(tags.indexOf('sher') > -1) {
                            //set the doc in the poets collection and poetHindi document
                            firebase.firestore().collection('poets').doc(poetHindi).collection('sher').doc(title).set({
                                title: title,
                                content: content,
                                poet: poetHindi,
                                english_name: poetEnglish,
                                tags: tags,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            })
                            .then(() => {
                                //update the total number of posts in that category
                                firebase.firestore().collection('poets').doc(poetHindi).update({
                                    sher: firebase.firestore.FieldValue.increment(1)
                                })
                                .then(() => {
                                    //show the mssg of uploaded
                                    this.emptyAll()
                                })
                            })
                        }
                        if(tags.indexOf('ghazal') > -1) {
                            firebase.firestore().collection('poets').doc(poetHindi).collection('ghazal').doc(title).set({
                                title: title,
                                content: content,
                                poet: poetHindi,
                                english_name: poetEnglish,
                                tags: tags,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            })
                            .then(() => {
                                firebase.firestore().collection('poets').doc(poetHindi).update({
                                    ghazal: firebase.firestore.FieldValue.increment(1)
                                })
                                .then(() => {
                                    this.emptyAll()
                                })
                            })
                        }
                        if(tags.indexOf('poems') > -1) {
                            firebase.firestore().collection('poets').doc(poetHindi).collection('poems').doc(title).set({
                                title: title,
                                content: content,
                                poet: poetHindi,
                                english_name: poetEnglish,
                                tags: tags,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            })
                            .then(() => {
                                firebase.firestore().collection('poets').doc(poetHindi).update({
                                    poems: firebase.firestore.FieldValue.increment(1)
                                })
                                .then(() => {
                                    this.emptyAll()
                                })
                            })
                        }
                    }
                })
                .catch(err => {
                    alert(err.message)
                })
            })
            .catch(err => {
                alert('cannot upload due to some error.')
            })
        })
    }

    upload = () => {
        var title = this.state.title.trim();
        var content = this.state.content.trim();
        var newTagInputValue = this.state.newTagInputValue.trim();
        if(this.state.tags.length === 0){
            alert('atleast one tag should be selected.')
        } else {
            if(title){
                    if(content){
                        this.setState({
                            disable: true
                        })
                        if(newTagInputValue !== ''){                 //there is a new tag
                            if(this.searchStringInArray(newTagInputValue, this.props.tags)){         //if tag is already available
                                alert('Your new tag is not new.It is already available.')
                                this.setState({
                                    disable: false
                                })
                            } else {                                                                            //if tag is actually new
                                this.setState(prev => ({
                                    tags: [...prev.tags, newTagInputValue]
                                }))
                                firebase.firestore().collection('tags').doc(newTagInputValue).set({
                                    totalShayaris: 0
                                })
                                .then(() => {
                                    this.finalUpload()
                                })
                            }
                        } else {                    //there is no new tag
                            this.finalUpload()
                        }
                    } else {
                        alert('content cannot be empty.')
                        console.log('empty content');
                    }
            } else {
                alert('title cannot be empty')
                console.log('empty title');
            }
        }
    }

    showNewTagInput = () => {
        this.setState({
            newTagInput: !this.state.newTagInput
        })
    }

    handleNewTag = (e) => {
        var newTag = e.target.value
        if(this.props.tags.indexOf(newTag) > -1) {
            this.setState({
                tagAvailable: false
            })
        } else {
            this.setState({
                tagAvailable: true
            })
        }
        this.setState({
            newTagInputValue: newTag
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
        const ruleListStyle = {
            padding: '6px',
            fontFamily: 'alconica',
            fontSize: '18px'
        }
        return (
            !this.state.authenticated 
            ? <input placeholder='password' onChange={(e) => this.authMe(e)}></input>
            // ? <h3>Under maintainance for some time</h3>
            :
            <>
            <div>
                <h3 style={{marginLeft: '10px', fontFamily: 'Alconica'}}>Rules to keep in mind while uploading:</h3>
                <ol>
                    <li style={ruleListStyle}>Title and content cannot be empty.</li>
                    <li style={ruleListStyle}>Atleast one tag should be assigned to the post, either by selecting from the already uploaded tags or by uploading a new tag.</li>
                    <li style={ruleListStyle}>Only one new tag can be added.</li>
                    <li style={ruleListStyle}>A post must not contain any pair of these three tags 'sher', 'ghazal', 'poems'.</li>
                    <li style={ruleListStyle}>Either both hindi and english names of the writer should be uploaded or both should remain empty.</li>
                    <li style={ruleListStyle}>Writings with empty writer name field are uploaded as anonymous.</li>
                </ol>
            </div>
            <div style={{textAlign: 'center', background: 'navajowhite', padding:'10px'}}>
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
                    {
                        this.state.tagAvailable ? null : <div style={{color: 'red'}}>This is not a new tag.</div>
                    }

                  <TextField
                      label="Title"
                      placeholder="Title should be unique"
                      margin="normal"
                      value={this.state.title}
                      onChange={e => this.handleTitleChange(e)}
                    />
                    {
                        this.state.titleAvailable ? null : <div style={{color: 'red'}}>This title is not available.</div>
                    }

                  <TextField
                      label="Content"
                      placeholder="Write beyond imagination"
                      multiline
                      margin="normal"
                      value={this.state.content}
                      onChange={e => this.handleContentChange(e)}
                    />

                    <select onChange={e => this.handlePoetChange(e)}>
                        <option value=''>--select Writer--</option>
                        {
                            this.state.poets_english_arr.slice().sort().map((poet, i) => (
                                <option key={i} value={poet}>
                                    {poet}
                                </option>
                            ))
                        }
                    </select>
                    <button type='submit' onClick={this.upload} className='uploadBtn' disabled={this.state.disable}>Upload</button>
                </FormControl>
            </div>
            </>
        )
    }
}

export default Upload