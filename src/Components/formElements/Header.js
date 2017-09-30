import React from 'react';

function Header(props){

  return(
    <div className="d-flex justify-content-center header">
        {props.children}
      <h1>Pattis Recept App</h1>
    </div>
  );    
}

export default Header;