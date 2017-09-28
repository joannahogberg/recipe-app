import React from "react";
import FlexContainer from '../formElements/FlexContainer.js';
import MyPageHeader from '../formElements/MyPageHeader.js';
import Button from '../formElements/Button.js';

function NoRecipes(props) {

return(
    <FlexContainer>
    {!props.userMsg &&  
        <MyPageHeader>
        <h4>Välkommen, {props.userName[0]}!</h4>
        <div className="about">
        <p>I denna app kan du hitta recept för alla smaker tillagda av dina nära, kära, vänner och bekanta.</p>
        <p>Du har ännu inga recept inlagda. Lägg gärna till dina favoriter för att dela glädjen av att laga mat med oss andra användare.</p>
        </div>
        <Button className="logInBtn" title="Lägg till recept" onClick={props.showRecipeForm}/>
        </MyPageHeader>}
    {props.userMsg &&  
        <MyPageHeader>
        <h4>Hej igen, {props.userName[0]}!</h4>
        <div className="about">
        <p>{props.userMsg}</p>
        </div>
        <Button className="logInBtn" title="Lägg till ett nytt recept" onClick={props.showRecipeForm}/>
        </MyPageHeader>}
    </FlexContainer>);
}

export default NoRecipes;