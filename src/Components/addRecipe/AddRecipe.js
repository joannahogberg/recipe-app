import React, { Component } from 'react';
import AddIngredients from './AddIngredients.js';
import AddHowToDo from './AddHowToDo.js';
import firebase from '../../firebase.js';
import CheckBox from '../formElements/CheckBox.js';
import FlexContainer from '../formElements/FlexContainer.js';
import ReviewRecipe from './ReviewRecipe.js';
import Select from '../formElements/Select.js';
import Button from '../formElements/Button.js';
import MyPageHeader from '../formElements/MyPageHeader.js';


class AddRecipe extends Component {

constructor(){
    super();
    this.state={
        newRecipe: {},
        reviewRecipe: [],
        allIngredients: [],
        allHowToDos: [],
        time: '',
        minHour: '',
        persons: '',
        error: false,
        veg: false,
        clicked: true,
        showForm: false,
        published: false
    } 
}   

//onChange for checkbox 
onChange = (e)=>{
    if(e.target.checked){
      this.setState({veg: true})
    }
    else{
      this.setState({veg: false})
    }
}

//onSelect for time, minHour and persons
onSelect= (e) =>{
    this.setState({[e.target.name]: e.target.value})
    }

//before submitting the form user gets to review the recipe and then choose to submit or edit
reviewRecipe=(e)=>{
  e.preventDefault();
    if((this.state.allHowToDos.length === 0) || (this.state.allIngredients.length === 0)){
    this.setState({error: true})
    }else{
           const newRecipe = {
            description: this.refs.description.value,
            howToDo: this.state.allHowToDos,
            time: this.state.time,
            minHour: this.state.minHour,
            persons: this.state.persons,
            allIngredients: this.state.allIngredients,
            recipeName: this.refs.recipeName.value,
            veg: this.state.veg
        }

    const reviewNewRecipe = [...this.state.reviewRecipe, newRecipe]

     this.setState({
        clicked: false,
        showForm: true,
        error: false,
        reviewRecipe: reviewNewRecipe
    });}
}
//if user chooses to edit recipe before submitting
editRecipe=()=>{
    this.setState({ clicked: true,
        showForm: false,
        reviewRecipe: []
    });
}
//Submit form
handleSubmit=(e)=>{

e.preventDefault();
//check if user have added ingredients and howToDos
if((this.state.allHowToDos.length === 0) || (this.state.allIngredients.length === 0)){
this.setState({error: true})
}else{

const image=this.refs.image.files[0];
const filename = image.name;
const storageRef = firebase.storage().ref('/recipeImages/'+filename);
const uploadFile = storageRef.put(image).then((snapshot)=> {

     this.setState({
            clicked:true,
            published: true, 
            newRecipe:{
            userId: this.props.currentUserId,
            description: this.refs.description.value,
            imageURL: snapshot.downloadURL,
            howToDo: this.state.allHowToDos,
            time: this.state.time,
            minHour: this.state.minHour,
            persons: this.state.persons,
            allIngredients: this.state.allIngredients,
            recipeName: this.refs.recipeName.value,
            veg: this.state.veg
        }},function(){
           this.props.addedRecipe(this.state.newRecipe)
       });
  
});
   
}   
}

//push ingredients value from AddIngredients.js to state
addIngredients=(ingredient)=>{
    const allIngredients = [...this.state.allIngredients, ingredient]
        this.setState({allIngredients: allIngredients})
}

//delete ingredient value from array
deleteIngredient=(id)=>{
    const newList = this.state.allIngredients.filter(ingredients => ingredients.id !== id);
        this.setState({ allIngredients: newList});
}

//push howToDo value from AddHowToDo.js to state
addToDo=(toDo)=>{
    const allHowToDos = [...this.state.allHowToDos, toDo]
        this.setState({allHowToDos: allHowToDos})
}

//delete howToDo and remove from array
deleteToDo=(id)=>{
    const newList = this.state.allHowToDos.filter(toDo => toDo.id !== id);
        this.setState({ allHowToDos: newList});
}


render() {

 
    const errorMsg = "Du måste lägga till ingredienser och alla steg"
    //toggle for submit and edit buttons
    const reviewRecipe = this.state.clicked ? <Button type="button" className="reviewBtn" title="Granska recept" onClick={this.reviewRecipe}/> :<div><Button type="submit" className="submitBtn" title="Publicera"/><Button type="button" className="editBtn" title="Editera" onClick={this.editRecipe}/></div>;
    const time = [1, 1.5, 2, 2.5, 3,3.5,4, 5,6,7,8,9, 10,15, 20, 30, 45, 60];
    const timeOptions = time.map((time, index )=>{
          return <option key={index} value={time}>{time}</option>})
    const minHour = ["min", "tim"];
    const minHourOptions = minHour.map((minHour, index )=>{
          return <option key={index} value={minHour}>{minHour}</option> })
    const persons = [1,2,3,4,5,6,7,8,9,10];
    const personsOptions = persons.map((persons, index )=>{
          return <option key={index} value={persons}>{persons}</option>})
    
    
    return (
        
  <FlexContainer>

      <MyPageHeader>
        <h4>Lägg till ett recept</h4>
        <div className="about">
        <p>Följ stegen nedan för att lägga till ett av dina nya favoritrecept.</p>
        </div>
    </MyPageHeader>
        {this.props.userMsg &&
          <div className="errorMsg">{this.props.userMsg}</div>
        } 
   
    <AddIngredients addIngredients={this.addIngredients} deleteIngredient={this.deleteIngredient}/>
    <AddHowToDo addToDo={this.addToDo} deleteToDo={this.deleteToDo}/>
    <div className="addDiv">
      <div className="form-steps"><span>3</span></div>
        <form onSubmit={this.handleSubmit} className="addForm">
                <h5>Lägg här till resterande:</h5>
                <div className="form-group">
                    <label >Receptnamn</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    ref="recipeName" 
                    placeholder="Namn på recept"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleTextarea">En kort beskrivning av maträtten</label>
                    <textarea 
                    className="form-control" 
                    rows="2" 
                    ref="description" 
                    placeholder="T.ex. Världens godaste soppa gjord på morötter, kokosmjölk... "
                    required
                    >
                    </textarea>
                </div>
            <div className="input-group">
                <div className="input-group-addon">Tillagningstid:</div>
                    <Select onChange={this.onSelect} name="time" className="custom-select form-control-sm" value={this.state.time} options={timeOptions} >
                        <option value="#"></option>
                    </Select>
                    <Select onChange={this.onSelect} name="minHour" className="custom-select form-control-sm" value={this.state.minHour} options={minHourOptions} >
                        <option value="#"></option>
                    </Select>
            </div>
            <div className="input-group">
                <div className="input-group-addon">Antal portioner;</div>
                    <Select onChange={this.onSelect} name="persons" className="custom-select form-control-sm" value={this.state.persons} options={personsOptions} >
                    <option value="#"></option>
                    </Select>
            </div>
            <label>Välj nu en bild i liggande format:</label>
            <div className="form-group">
                    <label className="custom-file">
                        <input 
                        type="file" 
                        className="custom-file-input" 
                        ref="image" 
                        aria-describedby="fileHelp"
                        required
                        />
                        <span className="custom-file-control"></span>
                    </label>
            </div>
            <CheckBox onChange={this.onChange} title="Detta recept är vegetariskt"/>
                {this.state.showForm &&
                    <ReviewRecipe recipe={this.state.reviewRecipe} editRecipe={this.editRecipe}/>
                    } 
                {this.state.error &&
                <div className="errorMsgInput">{errorMsg}</div>
                }
                {reviewRecipe &&
                <div>{reviewRecipe}</div>} 
        </form>
    </div>

</FlexContainer>
     
     

    );
  }
}

export default AddRecipe;