import React from "react";
/* Stateless component with state in the class component where it's used */
function CheckBox(props) {
  return (
       <div className="p-2">
    <label className="custom-control custom-checkbox">
    <span className="custom-control-description">{props.title}</span>
  <input type="checkbox" className="custom-control-input check" onChange={props.onChange}/>
  
 
  <span className="custom-control-indicator"></span>
</label>
   </div>
  );
}
export default CheckBox;