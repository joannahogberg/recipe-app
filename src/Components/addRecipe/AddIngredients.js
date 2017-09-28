import React, { Component } from 'react';
import uuid from 'uuid';
import IngredientsInputForm from './IngredientsInputForm.js';
import Basket from '../Icons/Basket.png';
import Button from '../formElements/Button.js';

class AddIngredients extends Component {
	constructor(props) {
        super(props);
        this.state = {
            id:uuid.v4(),
            inputList: []
        };
    }
     //when user clicks button generate inputform
    onAddBtnClick=(e) =>{
        const id= this.state.id;
        const inputForm = <IngredientsInputForm key={id} id={id} onSubmit={this.props.addIngredients} onDelete={this.onDelete}/>;
        const inputList = [...this.state.inputList, inputForm]
        this.setState({
            inputList: inputList, id:uuid.v4()});
    }

    //if user wants to remove a inputform filter state and update
   onDelete=(val, key)=>{
        //If the key of the removed child equals the current
        //looped item, do not return it. Result is every object
        //except the removed item
     const newInputList = this.state.inputList.filter(input => input.key !== key);
        this.setState({ inputList: newInputList});
        this.props.deleteIngredient(val);

   }
    

  
    render() {
        //toggle button title
        let title = this.state.inputList.length > 0 ? "Lägg till fler ingredienser" : "Lägg till ingredienser";
       
        return (
            <div className="addDiv">
                <div className="form-steps"><span>1</span></div>
                <img src={Basket} alt="basket" className="recipe-icon" height="25" width="25"/>
            <div className="p-2">
                
                <h5>Börja med att lägga till vilka ingredienser receptet innehåller:</h5>
                {this.state.inputList}

           
            </div>
            <div className="p-2">
                 <Button className="btn-sm addInputs" title={title} onClick={this.onAddBtnClick}/>
            </div>
            </div>
        );
    }
}

export default AddIngredients;