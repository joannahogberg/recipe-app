import React from 'react';
import Pizza from '../Icons/Pizza.png';
import Turkey from '../Icons/Turkey.png';
import Taco from '../Icons/Taco.png';
import Carrot from '../Icons/Carrot.png';
import Fish from '../Icons/Fish.png';
import Pie from '../Icons/Pie.png';
import Corn from '../Icons/Corn.png';
import Citrus from '../Icons/Sushi.png';
import Garlic from '../Icons/Garlic.png';
import Eggs from '../Icons/Eggs.png';
import Bread from '../Icons/Bread.png';
import Sushi from '../Icons/Sushi.png';


//flex container with animations

const FlexContainer = (props) => {
  return(
    <div className="flex-container">
      { props.children }

      <div className="animationContainer">
       <div className="animationDiv4">
            <img src={Pie} alt="basket" className="foods food2"/>
            <img src={Citrus} alt="basket" className="foods food1"/>
            <img src={Bread} alt="basket" className="foods food4"/>
            <img src={Taco} alt="basket" className="foods food2"/>
            <img src={Eggs} alt="basket" className="foods food4"/>   
        </div>
        <div className="animationDiv3">
            <img src={Pie} alt="basket" className="foods food3"/>
            <img src={Corn} alt="basket" className="foods food1"/>
            <img src={Eggs} alt="basket" className="foods food2"/>
            <img src={Garlic} alt="basket" className="foods food5"/>
            <img src={Carrot} alt="basket" className="foods food5"/>
          </div>

      <div className="animationDiv">
            <img src={Pizza} alt="basket" className="foods food1"/>
            <img src={Taco} alt="basket" className="foods food2"/>
            <img src={Turkey} alt="basket" className="foods food3"/>
            <img src={Fish} alt="basket" className="foods food5"/>
        </div>
          <div className="animationDiv3">
            <img src={Pie} alt="basket" className="foods food3"/>
            <img src={Corn} alt="basket" className="foods food3"/>
            <img src={Eggs} alt="basket" className="foods food2"/>
            <img src={Garlic} alt="basket" className="foods food3"/>
            <img src={Carrot} alt="basket" className="foods food5"/>
          </div>

         <div className="animationDiv2">
            <img src={Pie} alt="basket" className="foods food3"/>
            <img src={Corn} alt="basket" className="foods food3"/>
            <img src={Carrot} alt="basket" className="foods food5"/> 
        </div>
        <div className="animationDiv2">
            <img src={Fish} alt="basket" className="foods food2"/>
            <img src={Turkey} alt="basket" className="foods food3"/>
            <img src={Carrot} alt="basket" className="foods food1"/>
            <img src={Bread} alt="basket" className="foods food3"/>
            <img src={Pizza} alt="basket" className="foods food4"/>
            <img src={Citrus} alt="basket" className="foods food4"/>
        </div>
        <div className="animationDiv">
            <img src={Sushi} alt="basket" className="foods food2"/>
            <img src={Pizza} alt="basket" className="foods food1"/>
            <img src={Taco} alt="basket" className="foods food2"/>
            <img src={Fish} alt="basket" className="foods food5"/>
        </div>
         
        </div>
      
    </div>
  )
}

export default FlexContainer;