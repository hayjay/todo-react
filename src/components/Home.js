import React, { Component } from "react";
import '../Home.css'

class Home extends Component {
    constructor (props) {
        super(props);

        this.state = {
            method : "POST",
            user_details : [],
            user_name : '',
            user_email : '',
            password : '',
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
            }).then((res) => {
                return res.json()
            }).then(response => {//registration success
                //do other things with the user data here..
                console.log(response);

            }).catch((oops) => {
                console.log('Couldnot save user registration.. Try Again! ');
            })
        }
    }

    // this function captures the value entered in the form input field
    //  and could be called everytime a key is pressed in the text boss to 
    // save it to the application state
    //make sure to call this function and pass the parameter on each input field
    //in order to update the application state everytime a key is pressed
    captureUserDetails(event){
        //logs the event attribute of the html input field
        console.log(event);
        //update the notetext as its changes
        // check it out: we get the evt.target.name (which will be either "user_name", "user_email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [event.target.name] : evt.target.value });
    }

    render() {
        return (
            <div className="container">
            <input type='checkbox' id='form-switch'/>
                <form id='login-form' >
                    <input type="text" placeholder="Username" required/>
                    <input type="password" placeholder="Password" required/>
                    <button type='submit'>Login</button>
                    <label htmlFor='form-switch'><span>Register</span></label>
                </form>
                <form id='register-form' onSubmit={ this.handleRegistration }>
                    <input onChange={this.captureUserDetails(user_name, null, null) } value={ this.state.user_name } type="text" placeholder="Username" required/>
                    <input onChange={this.captureUserDetails(null, user_email, null) }  type="email" value={ this.state.user_email } placeholder="Email" required/>
                    <input onChange={this.captureUserDetails(null, null, password) }  type="password" value={ this.state.password } placeholder="Password" required/>
                    <button  type='submit' onClick={this.handleRegistration.bind(this) } >Register</button>
                    <label htmlFor='form-switch'>Already Member ? Sign In Now..</label>
                </form>
            </div>
        );
    }
};

export default Home;