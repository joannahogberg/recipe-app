import React from "react";

function MyPageHeader(props) {
 
return(
    <div className="my-page-header">
   {props.children}

    </div>);
}


export default MyPageHeader;