import React from 'react';

const Main = (props) => {
  return(
    <main className="container justify-content-center main">
      { props.children }
    
      <small className="joanna">&copy; 2017 | Joanna Högberg</small> 
         <small className="icon-link"> <a className="icon-link" href="https://icons8.com">Icons by icons8</a></small>
       
    </main>
  )
}

export default Main;