import React, { Component } from "react";
import '../Home.css'

class Home extends Component {
    constructor (props) {
        super(props);

        this.state = {
            method : "POST",
            user_details : [],
            url : 'http://localhost:4000/register'
        }
    };

    // addUser() {
    //     if(this.state.user_name === ''){return}
    //     let userArray = this.state.user_details;

    //     userArray.push({
    //         user_name : this.state.user_name,
    //         user_email : this.state.user_email,
    //         user_password : this.state.user_password
    //     })
    // }

    

    handleRegistration (e) {
        e.preventDefault();
        if(this.state.user_name === '' || this.state.password === '' || this.state.user_email === ''){
            this.handleClick();
        }else{
            fetch(this.state.url, {
                method : this.state.method,
                headers : {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json"
                },
                body : JSON.stringify({
                    "name" : this.state.user_name,
                    "email" : this.state.user_email,
                    "password" : this.state.password
                })
            })
        }
    }

    render() {
        return (
            <div className="container">
            <input type='checkbox' id='form-switch'/>
                <form id='login-form' >
                    <input type="text" placeholder="Username" required/>
                    <input type="password" placeholder="Password" required/>
                    <button type='submit'>Login</button>
                    <label for='form-switch'><span>Register</span></label>
                </form>
                <form id='register-form' onSubmit={ this.handleRegistration }>
                    <input value={ this.state.user_name } type="text" placeholder="Username" required/>
                    <input  type="email" value={ this.state.user_email } placeholder="Email" required/>
                    <input  type="password" value={ this.state.password } placeholder="Password" required/>
                    <button  type='submit' onClick={this.handleRegistration.bind(this) } >Register</button>
                    <label for='form-switch'>Already Member ? Sign In Now..</label>
                </form>
            </div>
        );
    }
};

export default Home;