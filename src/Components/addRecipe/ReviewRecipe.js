import React from "react";
import uuid from 'uuid';


function ReviewRecipe(props) {
 
    let recipeToReview = props.recipe.map(recipe=>{
        const allIngredients = recipe.allIngredients.map(item => {
           return <li key={uuid.v4()}> {item.ingredient} {item.qty} {item.measurment}</li>
        })
         const allToDos = recipe.howToDo.map(item => {
           return <li key={uuid.v4()}> {item.howToDo}</li>
        })
        return <div key={uuid.v4()} className="card" style={ {width: "100%"}}>
        <div className="card-block"> 
            <h5 className="mt-0">{recipe.recipeName} </h5>
        
           <p> {recipe.description}</p>
            </div>
             <div className="card-block">
            <div className="d-flex justify-content-start flex-wrap">
            <div className="p-2">
                <h6 className="mt-0">Tid:</h6>
            <p> {recipe.time} {recipe.minHour}</p>
            </div>
            <div className="p-2">
            <h6 className="mt-0">Antal portioner:</h6>
            <p> {recipe.persons}</p>
            </div>
            
            </div>
                
            <div className="d-flex justify-content-start flex-wrap">
            <div className="p-2">
                <h6 className="mt-0">Du behöver:</h6>
            <ul> {allIngredients}</ul>
            </div>
            <div className="p-2 flex-last">
            <h6 className="mt-0">Gör såhär:</h6>
            <ol> {allToDos}</ol>
            </div>
            
            </div>
        </div>           
    </div>

    })

return(
    <div className="d-flex flex-column justify-content-center m-2">
     {recipeToReview} 
    </div>);
}


export default ReviewRecipe;