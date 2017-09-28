import React from 'react';

function Button(props){
  return(
    <button type={props.type} className={ `btn ${ props.className }` } onClick={props.onClick}>
      { props.title }
    </button>
  )
}

export default Button;