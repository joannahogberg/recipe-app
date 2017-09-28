import React from "react";
import SignUpForm from './SignUpForm.js';
import LoginForm from './LoginForm.js';
import FlexContainer from '../formElements/FlexContainer.js';


function LoginSignUp(props) {
  return (
      <FlexContainer>
        <div className="loginSignUp">
            <LoginForm /> 
            <SignUpForm addUser={props.addUser} />
        </div>
      </FlexContainer>
        
  );
}
export default LoginSignUp;