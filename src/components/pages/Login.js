import React, { Component } from 'react'
import firebase from 'firebase'

class Login extends Component {

    loginWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            console.log('logged in.');
        })
        .catch(err => {
            alert(err.message)
        })
    }
    render() {
        const googleLoginBtn = {
            border: 'none',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '2%',
            boxShadow: '2px 3px 7px gainsboro',
            marginTop: '10px'
        }
        return (
            <div style={{textAlign: 'center'}}>
                <button onClick={this.loginWithGoogle} style={googleLoginBtn}>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png' alt='google-login'
                    style={{width: '20px', marginRight: '8px', verticalAlign: 'middle'}} />
                    <span>Login With Google</span>
                </button>
            </div>
        )
    }
}
export default Login