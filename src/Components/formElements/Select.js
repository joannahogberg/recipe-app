
import React from "react";

function Select(props) {
  return (
 
    <select onChange={props.onChange} className={props.className} name={props.name} value={props.value} disabled={props.disabled}>
        {props.children}
        {props.options}
    </select>
  
   
  );
}
export default Select;