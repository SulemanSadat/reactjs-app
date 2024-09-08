import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  // Define schema using Joi.object
  schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    
  });

  doSubmit = () => {
    // call the Server
    console.log("Submitted");
  };

  

  render() {
    

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          <br />
        {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
