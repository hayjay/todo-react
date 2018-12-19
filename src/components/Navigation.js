import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Navigation.css'

const Navigation = () => {
   return (
        <div className="note_nav">
            <NavLink to="/" className="note red">Home </NavLink>
            <NavLink to="/todos" className="sub_note">All Todo Lists</NavLink>

            <div className="nav-links">
                <NavLink to="/" className="sub_note">Completed Todos <span className="white">(3)</span></NavLink>
                <NavLink to="/" className="sub_note"> Pending Todos  <span className="white">(6)</span></NavLink>
                <NavLink to="/" className="sub_note" onClick={this.handleLogout.bind(this)}> Log-out</NavLink>
            </div>
        </div>
   );
};

export default Navigation;