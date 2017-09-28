
import React from "react";
import uuid from 'uuid';

function RecipeCards(props){
  
    let recipe = props.recipes.map(recipe=>{
        const user = props.users.filter(user => user.value.uid === recipe.value.userId ).map(user => user.value.name)
        return <div key={uuid.v4()} className="card cards">
        <div className="card-head text-center">
        <a href="#" onClick={() => props.onClick(recipe.key)}>
        <h5 className="recipe-link"> {recipe.value.recipeName}</h5>
        <img className="card-img-top" src={recipe.value.imageURL} alt={recipe.value.recipeName} /></a>
        </div>
        <div className="card-block cards-block"> 
        <p className="card-text">{recipe.value.description}</p>
        </div>
        <div className="card-footer text-muted text-center">
        <small className="text-muted">
          Recept av {user[0]} </small>
      </div>
    </div> 
})

return(
     <div className="recipes-container">
    {recipe}
    </div>);
}

export default RecipeCards;

