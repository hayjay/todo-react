import React, { Component } from "react";
import '../Home.css'
import AuthService from '../components/AuthService';
import withAuth from '../components/withAuth';
const Auth = new AuthService();

class Home extends Component {
    constructor (props) {
        this.Auth = new AuthService();
        
        super(props);

        this.state = {
            method : "POST",
            user_details : [],
            user_name : '',
            user_email : '',
            login_email : '',
            login_password : '',
            password : '',
            success_register : false,
            error : false,
            register_url : 'http://localhost:4000/register',
            login_url : 'http://localhost:4000/login'
        }
        //bind this.captureUserDetails to itself in order to avoid undefined .setState({}) method
        //for catching and holding the value of the input field
        this.captureUserDetails = this.captureUserDetails.bind(this); 
        //to bind the value of the login input fields
        // binding in render will create a function in each render , and that will cause a small performance issue, so its best practice to bind in class constructor instead
        this.captureUserLoginDetails = this.captureUserLoginDetails.bind(this); 
        //bind handleLogin function with this so that the app can get the updated this.state attribute
        this.handleLogin = this.handleLogin.bind(this);
        //bind login form submit
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    };


    handleUserAuthRedirect(auth_status){
        if(!auth_status){
            return 
        }
    }

    handleRegistration (e) {
        e.preventDefault();
        if(this.state.user_name === '' || this.state.password === '' || this.state.user_email === ''){
            console.log('All fields are required');
            this.setState({error : true});
        }else{
            fetch(this.state.register_url, {
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
                this.setState({success_register : true});

                console.log(response);
            }).catch((oops) => {
                console.log('Couldnot save user registration.. Try Again! ');
            })
        }
    }

    handleFormSubmit(e){
        e.preventDefault();
      
        this.Auth.login(this.state.login_email, this.state.login_password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }
    //handles redirection if we are alredy loggedin
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    // handleLogin(e) {
    //     e.preventDefault();
    //     alert('hi');
    //     console.log(, d);
    //     // if(this.state.login_email === '' || this.state.login_password === '') {
    //     //     return
    //     // }else{
    //     //     fetch(this.state.login_url, {
    //     //         method : this.state.method,
    //     //         headers : {
    //     //             "Content-Type": "application/json; charset=utf-8",
    //     //             "Accept": "application/json"
    //     //         },
    //     //         body : JSON.stringify({
    //     //             "email" : this.state.login_email,
    //     //             "password" : this.state.login_password
    //     //         })
    //     //     }).then((res) => res.json())
    //     //     .then((response) => {
    //     //         console.log(response);
    //     //     }).catch((err) => {
    //     //         console.log(`Login not successful ${err}`);
    //     //     });
    //     // }
    // }

    // this function captures the value entered in the form input field
    //  and could be called everytime a key is pressed in the text boss to 
    // save it to the application state
    //make sure to call this function and pass the parameter on each input field
    //in order to update the application state everytime a key is pressed
    captureUserDetails(event){
        //logs the event attribute of the html input field
        //update the notetext as its changes
        // check it out: we get the evt.target.name (which will be either "user_name", "user_email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        // we are doing this auto assign because our input field name attribute is thesame name with out state variable key declared
        this.setState({ [event.target.name] : event.target.value });
    }

    captureUserLoginDetails(event) {
        // console.log(event.target.value);

        this.setState({ [event.target.name] : event.target.value });
    }

    render() {
        return (
            <div className="container">
            <input type='checkbox' id='form-switch'/>
                <form id='login-form' onSubmit={ this.handleLogin } >
                    Email : <br/><br/> <input type="text" name="login_email" onChange={ this.captureUserLoginDetails } placeholder="Email" required/>  <br/><br/>
                    Password :  <br/><br/> <input type="password" name="login_password" onChange={ this.captureUserLoginDetails } placeholder="Password" required/> <br/><br/>
                    <button type='submit'>Login</button>
                    <label htmlFor='form-switch'> <span className="red">Register</span></label>
                </form>
                <form id='register-form' onSubmit={ this.handleRegistration }>
                    <input onChange={this.captureUserDetails } name="user_name" type="text" placeholder="Username" required/>
                    <input onChange={this.captureUserDetails } name="user_email" type="email"  placeholder="Email" required/>
                    <input onChange={this.captureUserDetails } name="password" type="password" placeholder="Password" required/>
                    <button  type='submit' onClick={this.handleRegistration.bind(this) } >Register</button>
                    <label htmlFor='form-switch'>Already Member ? Sign In Now..</label>
                </form>
            </div>
        );
    }
};

export default Home;