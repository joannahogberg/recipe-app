import React, {Component} from 'react';
import firebase from '../../firebase.js';
import Button from '../formElements/Button.js';
import GoogleSignIn from './GoogleSignIn.js';


class LoginForm extends Component {
    state={
        email: '',
        password: '',
        error:{
           message: ''
        }
      }

onChange= (e) =>{
        this.setState({[e.target.name]: e.target.value})
      }

onSubmit = (e) =>{
      e.preventDefault();
        const {email, password} = this.state; 
        firebase.auth().signInWithEmailAndPassword(email, password)
         .then(()=> {
             console.log("signed in")
    })
    .catch(error =>{
      this.setState({error})
    })
  }
render(){
return(
  
 <div className="formDiv">

<form onSubmit={this.onSubmit} className="form">
   <div className="form-group">
    <input 
    type="text" 
    className="form-control" 
    name="email" 
    placeholder="Email"
    onChange={this.onChange}
    value={this.state.email}/>  
    </div>
   <div className="form-group">
    <input 
    type="password" 
    className="form-control" 
    name="password" 
    placeholder="PassWord" 
    onChange={this.onChange}
    value={this.state.password}/>
   

  </div>

 <Button type="submit" className="logInBtn" title="Logga in"/>

</form>
  <div className="errorMsgInput">{this.state.error.message}</div>
  <GoogleSignIn/>   
</div>
)}
}

export default LoginForm;