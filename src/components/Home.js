import React from "react";
import '../Home.css'

const Home = () => {
    return (
        <div className="container">
           <input type='checkbox' id='form-switch'/>
            <form id='login-form' action="" method='post'>
            <input type="text" placeholder="Username" required/>
            <input type="password" placeholder="Password" required/>
            <button type='submit'>Login</button>
            <label for='form-switch'><span>Register</span></label>
            </form>
            <form id='register-form' action="" method='post'>
            <input type="text" placeholder="Username" required/>
            <input type="email" placeholder="Email" required/>
            <input type="password" placeholder="Password" required/>
            <input type="password" placeholder="Re Password" required/>
            <button type='submit'>Register</button>
            <label for='form-switch'>Already Member ? Sign In Now..</label>
            </form>
        </div>
    )
};

export default Home;