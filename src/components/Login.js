import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
const Index = () => <h2>Home</h2>;
const Todos = () => <h2>Todos</h2>;
const Logout = () => <h2>Logout</h2>;

const AppRouter = () => {
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home </Link> 
                    </li>
                    <li>
                        <Link to="/todos">Todos </Link> 
                    </li>
                    <li>
                        <Link to="/logout">Loogout!</Link> 
                    </li>
                <ul>
            </nav>

            <Route path="/" exact component={Index} />
            <Route path="/todos" component={Todos} />
            <Route path="/logout" component={Logout} />
        </div>
    </Router>
};

export default AppRouter;
