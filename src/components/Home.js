import React from "react";
import '../Home.css'

const Home = () => {

    handleRegistration (e) {
        e.preventDefault();
    }

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
            <input type="text" placeholder="Username" required/>
            <input type="email" placeholder="Email" required/>
            <input type="password" placeholder="Password" required/>
            <input type="password" placeholder="Re Password" required/>
            <button type='submit' onClick={this.handleRegistration.bind(this) } >Register</button>
            <label for='form-switch'>Already Member ? Sign In Now..</label>
            </form>
        </div>
    )
};

export default Home;