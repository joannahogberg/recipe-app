import React, {Component} from 'react';
import Select from '../formElements/Select.js';
import FlexContainer from '../formElements/FlexContainer.js';
import SearchGroup from '../formElements/SearchGroup.js';
import MyPageHeader from '../formElements/MyPageHeader.js';
import RecipeSingle from './RecipeSingle.js';
import RecipeCards from './RecipeCards.js';
import SearchInput from "./SearchInput.js";
import CheckBox from '../formElements/CheckBox.js';
import Button from '../formElements/Button.js';



class RecipesPage extends Component {
state={
    value:'',
    showRecipe: false,
    checked: false,
    recipeId: '',
    userMsg: this.props.userMsg,
    className: "errorMsg"

}

onChange=(e)=>{
this.setState({value: e.target.value},function(){
         this.props.selectByName(this.state.value)})
}

//For checkbox to filter on vegetarian recipes
onCheck = (e)=>{
    if(e.target.checked){
      this.setState({checked: this.props.checked},function(){
         this.props.vego(this.state.checked)})
    }
    else{
      this.setState({checked: this.props.checked},function(){
         this.props.vego(this.state.checked)})
    }
}
//Toggle for showing single recipe
showSingle=(id)=>{
  this.setState({showRecipe:true, recipeId: id,userMsg:'', className: '' })

}
//Toggle for showing all recipes
showAll=()=>{
  this.setState({showRecipe:false, recipeId: ''})
}

render(){
  const {showRecipe, className, userMsg, recipeId} = this.state;
  
  const nrOfrecipes = this.props.recipes.length===1 ? "inlagt" : "inlagda";
  //Set options for select to filter recipes on userIds
  const options = this.props.users.map(name =>{
        return <option key={name.value.uid} value={name.value.uid}>{name.value.name}</option>
        })
  //Check state for showing single recipe och all recipes
  const recipesToRender = showRecipe ? 
   <RecipeSingle recipes={this.props.recipes}  users={this.props.users} id={recipeId} onClick={this.showAll} deleteRecipe={this.props.deleteRecipe}/>
    : <RecipeCards recipes={this.props.recipes} users={this.props.users} onClick={this.showSingle} />;
  
  return(
  
 <div>
  {!this.props.userName &&
      <SearchGroup>
      <Select onChange={this.onChange} className="custom-select form-control-sm" options={options} >
      <option value="0">Välj recept efter användare</option> 
      </Select>
      <SearchInput onSubmit={this.props.searchBy} ingredients={this.props.ingredients}/>
      <CheckBox onChange={this.onCheck} title="Visa endast vegetariska"/>
      {this.props.userMsg &&
        <div className={className}>{userMsg}</div>
          } 
      </SearchGroup>}
  <FlexContainer>
      {this.props.userName &&
        <MyPageHeader>
        <h4>Hej, {this.props.userName[0]}!</h4>
        {this.props.userMsg &&
        <div className={className}>{userMsg}</div>} 
        <div className="about">
        <p>Du har {this.props.recipes.length} {nrOfrecipes} recept.</p>
        <p>Här kan du ta bort recept du inte längre vill ha kvar. För att ta bort ett recept, klicka in på det recept du vill ta bort och välj radera recept.</p>
        </div>
        <Button className="logInBtn" title="Lägg till ett nytt recept" onClick={this.props.showRecipeForm}/>
        </MyPageHeader>}
        {recipesToRender}
  </FlexContainer>
</div>

    )
  }
}

export default RecipesPage;