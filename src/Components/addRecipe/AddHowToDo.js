import React, { Component } from 'react';
import uuid from 'uuid';
import HowToDoInputForm from './HowToDoInputForm.js';
import Pan from '../Icons/Pan.png';
import Button from '../formElements/Button.js';

class AddHowToDo extends Component {
	constructor(props) {
        super(props);
        this.state = {
            id:uuid.v4(),
            inputList: []
        };
    }

    //when user clicks button generate inputform
    onAddBtnClick=(e) =>{
        const id = this.state.id;
        const inputForm = <HowToDoInputForm key={id} id={id} onSubmit={this.props.addToDo} onDelete={this.onDelete}/>;
         
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
        this.props.deleteToDo(val);

   }
    

  
    render() {
        //toggle button title
        let title = this.state.inputList.length > 0 ? "Lägg till fler steg" : "Lägg till steg";
        return (
            <div className="addDiv">
                <div className="form-steps"><span>2</span></div>
                <img src={Pan} alt="pan" className="recipe-icon" height="30" width="30"/>
                <div className="p-2">
                
                 <h5>Lägg sedan till instruktioner:</h5>
                
                {this.state.inputList}
                </div>
                <div className="p-2">
                  <Button className="btn-sm addInputs" title={title} onClick={this.onAddBtnClick}/>
         
            </div>
            </div>
        );
    }
}

export default AddHowToDo;