import React, { Component } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  // Define schema using Joi.object
  schema = Joi.object({
    username: Joi.string().required().label("Username").min(5),
    password: Joi.string().required().label("Password").min(5),
    name: Joi.string().required().label("Name"),
  });

  doSubmit = () => {
    // Call the Server
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          <br />
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
