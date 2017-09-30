import React, { Component } from 'react';
import './sass/App.css';
import firebase from './firebase.js';
import Main from './Components/formElements/Main.js';
import AddRecipe from './Components/addRecipe/AddRecipe.js';
import RecipesPage from './Components/showRecipes/RecipesPage.js';
import NoRecipes from './Components/showRecipes/NoRecipes.js';
import NavBar from './Components/formElements/NavBar.js';
import Header from "./Components/formElements/Header.js";
import LoginSignUp from './Components/loginSignUp/LoginSignUp.js';
import uuid from 'uuid'; //react-function to get random id's

var db = firebase.database();

class App extends Component {

  state={
    users:[], //all users
    recipes: [], //all recipes
    recipesByTerms: [], //array to store filtered recipes when user make a search request
    ingredients:[], //all ingredients
    myRecipes:[], //current user recipes
    checked:true,
    user: '',
    uid: '',
    showLogSignForm: true,
    showRecipes: false,
    showRecipeForm: false,
    selectByTerm: false,
    showMyPage: false,
    userFeedback: ''
  }

componentDidMount(){ 
firebase.auth().onAuthStateChanged((user) =>{
 
  if (user) {
console.log("hello")
          db.ref('recipes')
         .orderByChild('userId')
         .equalTo(user.uid) 
         .on('child_added', (snapshot) => {
          const recipe = {
          key: snapshot.key,
          value: snapshot.val()
          }
          //Push the new recipe into the existing array
          const myRecipes= [...this.state.myRecipes, recipe]
          this.setState({myRecipes})
          })
          db.ref('recipes')
         .orderByChild('userId')
         .equalTo(user.uid) 
         .on('child_removed', (snapshot) => {
          //Filter the previous state
          let myRecipes = this.state.myRecipes
            //If the key of the removed child equals the current
            //looped item, do not return it. Result is every object
            //except the removed item
            .filter(recipe => recipe.key !== snapshot.key)
         this.setState({ myRecipes})
        
        })

  this.setState({user: user, uid: user.uid, showLogSignForm: false,showMyPage: true })
  
  } else {
    this.setState({user: ''})
  }
});

    db.ref("ingredients")
        .on('child_added', (snapshot)=>{
          const ingredients= [...this.state.ingredients, snapshot.val()]
          this.setState({ingredients: ingredients });
    })

    db.ref("recipes")
      .on('child_added', (snapshot)=>{
        const recipe = {
          key: snapshot.key,
          value: snapshot.val()
        }
        const recipes= [...this.state.recipes, recipe]
        this.setState({recipes});
    })

    db.ref("recipes")
      .on('child_removed', (snapshot) => {
         let recipes = this.state.recipes
          .filter(recipe => recipe.key !== snapshot.key)
          this.setState({ recipes, showRecipes: false, showMyPage: true  })
        })

    db.ref("users")
      .on('child_added', (snapshot)=>{
        const user = {
          key: snapshot.key,
          value: snapshot.val()
        }
        const users = [...this.state.users, user]
        this.setState({users: users});
    })
  }

    
  addUser=(user)=>{
    db.ref("users")
          .push(user)
  }

  signOut = () => {
   firebase.auth().signOut()     
   .then(()=> {
      this.setState({showLogSignForm : true, showMyPage: false, showRecipes: false, showRecipeForm:false});
      console.log("signed out")
    });
  
  }


  //Add new recipe
  addedRecipe=(val)=>{

    //Get values for new ingredients added in recipe
    const ingredients = val.allIngredients.map(item => item.ingredient);
    //Get values for existing ingredients in db
    var ingredientsArr = this.state.ingredients;
    //Filter new values and compare with existing values, return only the new values that does not already exists in db
    const myArray = ingredients.filter(ingredient => {
    return ingredientsArr.indexOf(ingredient) < 0;
    });
    //Concat existing values with new values
    var newArr = ingredientsArr.concat(myArray);
 
    db.ref("recipes")
      .push(val)
      .then(()=> {
        this.setState({userFeedback: "Ditt recept är nu tillagt", showRecipeForm:false, showRecipes: false, showMyPage: true })
      })
      .catch(error => {console.log('You messed up', error)
       this.setState({userFeedback: "Något gick fel, försök igen"})
    });  

    db.ref("ingredients")
      .push(ingredients) 
      
    db.ref("ingredients")
      .set(newArr)
      .then(()=> {
      })
      .catch(error => {console.log('You messed up', error)});    
    
  }

  deleteRecipe=(key)=>{
      db.ref(`recipes/${key}`).remove()
      .then(()=> {console.log('Removed!')
        this.setState({showLogSignForm: false, showRecipeForm: false, showMyPage: true, showRecipes: false, userFeedback: "Ditt recept har nu tagits bort"})
    })
      .catch(error => {console.log('You messed up', error)
       this.setState({userFeedback: "Något gick fel, försök igen"})
    });
  }

  //Toggle for loginPage
  toggleLoginSignUp = () => {
    this.setState({showLogSignForm : true, showRecipes: false, showRecipeForm: false, showMyPage: false});
  };
   //Toggle for recipe add form
  showRecipeForm = () => {
    this.setState({showMyPage: false, showRecipeForm: true, showRecipes: false, showLogSignForm : false, userFeedback: ''})
  }
  //Toggle for recipes page
  showRecipes = () => {

    this.setState({showMyPage: false,showRecipes: true, showLogSignForm : false, showRecipeForm: false, selectByTerm: false, userFeedback: '' })
  }

  //Toggle for my recipes page
  showMyRecipes = () => {
  this.setState({showMyPage: true,showRecipes: false, showLogSignForm : false, showRecipeForm: false, selectByTerm: false, userFeedback: '' })
  

  }


  //Filter recipe search on added by user. Value sent from select option
  selectByName = (id) => {
   
  const recipeById = this.state.recipes.filter(recipe => recipe.value.userId === id)
    if(recipeById.length>0){
      this.setState({ recipesByTerms: recipeById, selectByTerm: true, userFeedback: '' });
    }else{
      this.setState({ recipesByTerms:this.state.recipes, userFeedback: "Användaren har inga inlagda recept ännu"});
    }
      
  }

  //Filter recipe search on ingredient. Value sent from Autocomplete
  filterBySearch = (val) => {
      
      const recipesByIngredients =  this.state.recipes.filter((recipe) =>
                    //Object.prototype.some() method to test whether 
                    //some element in the allIngredients array match the ingredient value that is implemented by the provided function.
                    recipe.value.allIngredients.some((ingredient) => ingredient.ingredient === val))
                .map(recipe => {
                    return recipe;
                }, 0);
      if(recipesByIngredients.length>0){
        this.setState({ recipesByTerms: recipesByIngredients, selectByTerm: true, userFeedback: ''});
      } else{
        this.setState({recipesByTerms:this.state.recipes, userFeedback: "Din sökning gav tyvärr inga träffar" });
      }   
  }

  //Filter recipes on vegetarian options. Value sent from checkbox
  filterByVego = (val)=>{
 
    if(val){
      const recipeByVeg = this.state.recipes.filter(recipe => recipe.value.veg === val)
      if(recipeByVeg.length===0){
          this.setState({ recipesByTerms:this.state.recipes, userFeedback: "Det finns för tillfället inga vegetariska recept. Lägg gärna till ett direkt!", selectByTerm: false, checked:true});
      
      }else{
        this.setState({ recipesByTerms: recipeByVeg, selectByTerm: true, userFeedback: '', checked:false });
        }
    }else{
      this.setState({ recipesByTerms:this.state.recipes, userFeedback: '', selectByTerm: false, checked:true});
      }
  }
   
render() {

  const { uid, user, users, showLogSignForm, userFeedback, myRecipes, showRecipeForm, showRecipes, selectByTerm, ingredients, recipes, recipesByTerms, checked, showMyPage} = this.state;
  
  //Get userName for current user
  const userName = users.filter(user => user.value.uid === uid ).map(user => user.value.name)

  const showForm = showLogSignForm ? <LoginSignUp addUser={this.addUser}/> : "";

  let recipesToRender = selectByTerm ? recipesByTerms : recipes;
   recipesToRender = recipesToRender.filter(recipe => recipe);

  //Get current user recipes, if no recipes return NoRecipe component else return RecipesPage and send current user recipes
  const renderMyRecipes = (myRecipes.length !== 0) ?    
   <RecipesPage ingredients={ingredients} userMsg={userFeedback} recipes={myRecipes} users={users} selectByName={this.selectByName} userName={userName} searchBy={this.filterBySearch} clearMsg={this.clearUserFeedback} vego={this.filterByVego} checked={checked} deleteRecipe={this.deleteRecipe} showRecipeForm={this.showRecipeForm} />
    : <NoRecipes showRecipeForm={this.showRecipeForm} userName={userName} userMsg={userFeedback}/>;
  
  
return (
      <div className="App">
        <Main key={uuid.v4()}>
          <Header >
          <NavBar loggedIn={user} userName={userName} signOut={this.signOut} signIn={this.toggleLoginSignUp} showRecipes={this.showRecipes} showLogSignForm={showLogSignForm} showRecipeForm={this.showRecipeForm} showMyRecipes={this.showMyRecipes}/>
          </Header>
              <div>{showForm}</div>
              {showRecipeForm &&
              <AddRecipe addedRecipe={this.addedRecipe} users={users} currentUserId={uid} showRecipes={this.showRecipes} userMsg={userFeedback}/>  
              }
              {showRecipes &&
              <RecipesPage ingredients={ingredients} userMsg={userFeedback} recipes={recipesToRender} users={users} selectByName={this.selectByName} searchBy={this.filterBySearch} clearMsg={this.clearUserFeedback} vego={this.filterByVego} checked={checked}/>
              }
              {showMyPage &&
              <div>{renderMyRecipes}</div>
              }
         </Main> 
      </div> //end App
    );
  }
}

export default App;


