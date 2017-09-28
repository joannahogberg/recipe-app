import React, {Component} from 'react';
import firebase from '../../firebase.js';
import googleBtn from './googleBtn.png';

class GoogleSignIn extends Component {
    state={
        email: '',
        password: '',
        error:{
           message: ''
        }
    }

onClick = (e) =>{

     e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) =>{
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user)

        firebase
          .database()
          .ref(`users/${user.uid}`)
          .set({ email: user.email, uid: user.uid, name: user.displayName})

     }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        this.setState({error: error.message})

});
      
  }
render(){
  
return(
    <div className="google">
    <form>
        <fieldset>
        <legend>eller:</legend>
        <img 
        src={googleBtn} 
        alt="Google Sign In" 
        height="46" width="191"
        onClick={this.onClick}/>
        <div className="errorMsgInput">{this.state.error.message}</div>
        </fieldset>
    </form>
    </div>
    )
  }
}

export default GoogleSignIn;