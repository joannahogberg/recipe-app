
import React from "react";
import uuid from 'uuid';


function RecipeSingle(props){
    const recipe = props.recipes.filter(recipe=> recipe.key === props.id)

    let singleRecipe = recipe.map(recipe=>{
        const allIngredients = recipe.value.allIngredients.map(item => {
           return <li key={uuid.v4()}> {item.ingredient} {item.qty} {item.measurment}</li>
        })
         const allToDos = recipe.value.howToDo.map(item => {
           return <li key={uuid.v4()}> {item.howToDo}</li>
        })
        const user = props.users.filter(user => user.value.uid === recipe.value.userId ).map(user => user.value.name)

        return <div key={uuid.v4()} className="card" style={ {width: "100%"}}>
          <div className="card-head">
        <a href="#" className="nav-link" onClick={props.onClick}>Gå tillbaka</a>

        {props.deleteRecipe &&
          <a href="#" className="nav-link" onClick={()=>props.deleteRecipe(recipe.key)}>Radera recept</a>
        }
      </div>
           
        <div className="card-block"> 
            <h5 className="mt-0">{recipe.value.recipeName} </h5>
           <small className="text-muted">
          Recept av {user[0]} </small>
           <p> {recipe.value.description}</p>
            </div>
             <div className="card-block">
                        <div className="d-flex justify-content-start flex-wrap">
            <div className="p-2">
                <h6 className="mt-0">Tid:</h6>
            <p> {recipe.value.time} {recipe.value.minHour}</p>
            </div>
            <div className="p-2">
            <h6 className="mt-0">Antal portioner:</h6>
            <p> {recipe.value.persons}</p>
            </div>
            
            </div>
                
                     <div className="d-flex justify-content-start flex-wrap">
                <div className="">
            <h6 className="mt-0">Du behöver:</h6>
            <ul className="ingredient-list"> {allIngredients}</ul>
            </div>
            <div className="">
            <h6 className="mt-0">Gör såhär:</h6>
            <ol> {allToDos}</ol>
            </div>
            
            </div>
        </div>
       

         <img className="card-img-bottom" src={recipe.value.imageURL} alt={recipe.value.recipeName} style={ {width: "100%"}}/>
    </div>

    })

return(
    <div className="single-container">     
    {singleRecipe}
    </div>);
}

export default RecipeSingle;