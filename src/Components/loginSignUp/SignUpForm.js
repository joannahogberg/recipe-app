import React, {Component} from 'react';
import firebase from '../../firebase.js';
import Button from '../formElements/Button.js';

class SignUpForm extends Component {
    state={
        email: '',
        password: '',
        name: '',
        newUser: {},
        error:{
           message: ''
        }

    }

  onChange= (e) =>{
    this.setState({[e.target.name]: e.target.value})
    }

  onSubmit = (e) =>{
      e.preventDefault();

  const {email, password, name} = this.state; 
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=> {
      firebase
          .database()
          .ref(`users/${user.uid}`)
          .set({ email: user.email, uid: user.uid, name: name })
      
        }).catch(error =>{
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
    name="name" 
    placeholder="UserName"
    onChange={this.onChange}
    value={this.state.name}/>
   
       
    </div>
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
  <Button type="submit" className="signUpBtn" title="Registrera dig"/>
 
</form>
<div className="errorMsgInput">{this.state.error.message}</div>
</div>
 )
}
}

export default SignUpForm;