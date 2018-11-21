import React from "react";

const Home = () => {
    return (
        <div>
            <p>
                <form method="" action="">
                    <label >Name : </label>
                    <input type="text" name="name" id="name"></input>

                    <label >Email : </label>
                    <input type="text" name="email" id="email"></input>
                    
                    <label >Password : </label>
                    <input type="text" name="password" id="password"></input>
                </form>
            </p>
        </div>
    )
};

export default Home;