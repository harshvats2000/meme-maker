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

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            tags: []
        }
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

    upload = () => {
        var tags = this.state.tags;
        var title = this.state.title;
        var content = this.state.content;
        if(!tags){
            if(!title){
                if(!content){
                    //upload
                    this.state.tags.forEach(tag => {
                        firebase.firestore().collection('tags').doc(tag).collection('shayaris').doc().set({
                            title: title,
                            content: content
                        })
                    })
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

    render() {
        return (
            <div>
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

                  <TextField
                      id="standard-textarea"
                      label="Title"
                      placeholder="Choose title wisely"
                      margin="normal"
                      value={this.state.title}
                      onChange={e => this.handleTitleChange(e)}
                    />
                  <TextField
                      id="standard-textarea"
                      label="Content"
                      placeholder="Write beyond imagination"
                      multiline
                      margin="normal"
                      value={this.state.content}
                      onChange={e => this.handleContentChange(e)}
                    />
                    <button type='submit' onClick={this.upload}>Upload</button>
                </FormControl>
            </div>
        )
    }
}

export default Upload