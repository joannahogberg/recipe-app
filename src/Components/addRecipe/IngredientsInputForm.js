import React, { Component } from 'react';
import uuid from 'uuid';
import Select from '../formElements/Select.js';
import Button from '../formElements/Button.js';



class IngredientsInputForm extends Component{

       state={
        ingredient: '',
        measurment: '',
        qty: '',
        ingredientObject: {},
        errorMsg:'',
        clicked: true,
        inputs: false //show values and buttons only when user adds input
       
       }

onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value, inputs: true})
    }
onSubmit = (e) =>{
    e.preventDefault();
    if(!this.state.ingredient || !this.state.qty || !this.state.measurment){
      this.setState({errorMsg: 'Du måste fylla i alla fält'})
    }else{
      const addedingredient = {
          id: uuid.v4(), 
          ingredient: this.state.ingredient.toLowerCase(),
          measurment: this.state.measurment,
          qty: this.state.qty
      }
    this.setState({ingredientObject: addedingredient, clicked: false, errorMsg:''},function(){
        this.props.onSubmit(this.state.ingredientObject)//Send values to AddIngredients.js
    });
  }
}

render(){

      //disable inputs when user add values
      const disabled = this.state.clicked ? "" : "disabled";
      //toggle buttons
      const ingredienceAdded = this.state.clicked ? <Button type="submit" className="btn-sm submitInputBtn" title="+"/> : 
      //send values to AddIngredients.js if user chooses to delete added values
      <Button type="submit" className="btn-sm editInputBtn" title="–" onClick={() => this.props.onDelete(this.state.ingredientObject.id, this.props.id)}/>;
      const measurments = ["l", "st","dl", "ml", "cl", "droppar", "msk", "tsk", "krm", "kilo", "hg", "g", "burk", "burkar", "pkt", "påse", "påsar", "nypa", "knippe", "klyfta", "klyftor"];
      const options = measurments.map((meas, index )=>{
      return <option key={index} value={meas}>{meas}</option>
})

return(

<form onSubmit={this.onSubmit} >
  
    <div className="form-inline">
       <div className="form-group">
      <input name="ingredient" type="text" className="form-control form-control-sm input-field" placeholder="Ingrediens" onChange={this.onChange} value={this.state.ingredient} disabled={disabled}/>
      <input name="qty" type="text" className="form-control col-sm-2 form-control-sm input-field" placeholder="Antal" onChange={this.onChange} value={this.state.qty} disabled={disabled}/>
  
    <Select onChange={this.onChange} name="measurment" className="custom-select form-control-sm" value={this.state.measurment} options={options} disabled={disabled}>
    <option value="#">Enhet</option>
    </Select>
    </div>
   <div className="form-group">
  <label className="form-label ingredient-added"> {this.state.ingredient + " "+ this.state.qty +" "+ this.state.measurment}</label>

{this.state.inputs &&
<div className="addBtn">{ingredienceAdded}</div>
}
</div>
  </div>
    <div className="errorMsgInput">{this.state.errorMsg}</div>
  
  </form>
  


	); 
}
}

export default IngredientsInputForm;