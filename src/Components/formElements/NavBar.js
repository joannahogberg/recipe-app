import React from 'react';

const NavBar = (props)=>{

    const logSignIn = props.loggedIn ? <a className="nav-link" onClick={props.signIn} href="#">Login/SignUp</a> : "";
 
    return(
<div className="nav">
<nav className="navbar navbar-toggleable-md">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="meny">Meny</span>
  </button>

  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav mr-auto">
   
     {props.showLogSignForm &&
      <li className="nav-item">
         {logSignIn}
      </li>}
      {!props.showLogSignForm &&
      <li className="nav-item">
         <a className="nav-link" onClick={props.signOut} href="#">Sign Out</a> 
      
      </li>}
      {props.loggedIn &&
        <li className="nav-item">
        <a className="nav-link" onClick={props.showRecipes} href="#">Sök Recept</a>
      </li> }
      {props.loggedIn &&
      
    <li className="nav-item">
        <a className="nav-link" onClick={props.showRecipeForm} href="#">Lägg till recept</a>
      </li> 
      }
    {props.loggedIn &&
      
    <li className="nav-item">
        <a className="nav-link" onClick={props.showMyRecipes} href="#">Mina Recept</a>
      </li> 
      }
    </ul>
    
     {props.loggedIn &&
       <li className="navbar-brand user-logo">{props.userName[0]}</li>}
  </div>
       
</nav>
 
        </div>

    );

}     
    

export default NavBar;