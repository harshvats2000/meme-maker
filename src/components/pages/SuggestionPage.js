import React, { Component } from 'react';
import SnackbarContainer from '../../container/Snackbar';
import firebase from 'firebase/app'
import 'firebase/firestore'

export default class SuggestionPage extends Component {
    constructor(){
        super()
        this.state = {
            suggestion: '',
            email: '',
            open: false,
            message: '',
            sending: false
        }
    }
    
    handleSuggestionChange = e => {
        this.setState({
            suggestion: e.target.value
        })
    }

    handleEmailChange = e => {
        this.setState({
            email: e.target.value
        })
    }

    validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleSendClick = e => {
        if(this.state.suggestion !== ''){
            if(this.validateEmail(this.state.email)){
                this.setState({
                    sending: true
                })
                firebase.firestore().collection('suggestions').doc().set({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    suggestion: this.state.suggestion,
                    email: this.state.email
                })
                .then(() => {
                    this.setState({
                        open: true,
                        message: 'feedback sent.',
                        suggestion: '',
                        email: '',
                        sending: false
                    })
                })
                .catch(err => {
                    this.setState({
                        open: true,
                        message: 'cannot send due to some error.'
                    })
                })
            } else{
                this.setState({
                    open: true,
                    message: 'email is not valid.'
                })
            }
        } else{
            this.setState({
                open: true,
                message: 'suggestion cannot be empty.'
            })
        }
    }

    handleSnackbarClose = e => {
        this.setState({
            open: false
        })
    }

    render() {
        const formContainer = {
            padding: '10px'
        }
        const suggestionInput = {
            padding: '5px',
            margin: '10px'
        }
        const emailInput = {
            padding: '5px',
            margin: '10px'
        }
        const sendBtn  = {
            padding: '5px',
            margin: '10px',
            width: '60px'
        }
        return (
            <div style={{textAlign: 'center'}}>
                <h2>Suggestions</h2>
                <p>Your suggestion help us to improve this platform.:)</p>
                <div style={formContainer}>
                    <textarea rows={5} cols={30} style={suggestionInput} placeholder='suggestion' value={this.state.suggestion} onChange={this.handleSuggestionChange} /><br/>
                    <input style={emailInput} placeholder='email' value={this.state.email} type='email' onChange={this.handleEmailChange} /><br/>
                    <button style={sendBtn} onClick={e => this.handleSendClick()} disabled={this.state.sending}>Send</button><hr/>

                    <SnackbarContainer open={this.state.open} message={this.state.message} handleClose={this.handleSnackbarClose} />
               </div>
            </div>
        )
    }
}
