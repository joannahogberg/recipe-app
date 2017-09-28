import React, { Component } from 'react';
import uuid from 'uuid';
import Button from '../formElements/Button.js';



class HowToDoInputForm extends Component{

       state={
        howToDo: '',
        howToDoObj: {},
        clicked: true,
         errorMsg:'',
     
       }

onChange= (e) =>{
    this.setState({[e.target.name]: e.target.value})
    }
onSubmit = (e) =>{
      e.preventDefault();

      if(!this.state.howToDo){
           this.setState({errorMsg: 'Du måste fylla i steg'})
      }else{
        const addedToDo = {
          id: uuid.v4(), 
          howToDo: this.state.howToDo,
         
      }
          this.setState({howToDoObj: addedToDo, clicked: false, errorMsg:''},function(){
          this.props.onSubmit(this.state.howToDoObj)//Send values to AddHowToDo.js
        });
      }
  
  }

render(){
    //disable inputs when user add values
    const disabled = this.state.clicked ? "" : "disabled";
    //toggle buttons
    const howToDoAdded = this.state.clicked ? <Button type="submit" className="btn-sm submitInputBtn" title="+"/> : 
    //send values to AddHowToDo.js if user chooses to delete added values
     <Button type="submit" className="btn-sm editInputBtn" title="–" onClick={() => this.props.onDelete(this.state.howToDoObj.id, this.props.id)}/>;
      
    
    return(

    <form onSubmit={this.onSubmit} >
    <div className="form-group row">
     
       <div className="col-sm-10">
      <textarea name="howToDo" type="text" rows="1" className="form-control form-control-sm" placeholder="T.ex Sätt på ugnen..." onChange={this.onChange} value={this.state.howToDo} disabled={disabled}></textarea>
</div>
  
     
{howToDoAdded &&
<div className="addBtn">{howToDoAdded}</div>
}
</div>
    
    <div className="errorMsgInput">{this.state.errorMsg}</div>
     </form>

  

	); 
}
}

export default HowToDoInputForm;