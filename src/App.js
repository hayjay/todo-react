import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Note from './components/Note'; //import Note component
import Error from './components/NotFound';
// navbar import
import Navigation from './components/Navigation';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';

class App extends Component {
  constructor () {
    super();

    this.state = {
      noteText : '',
      notes : [], //holds array of each note we want to create,
      singleNote : ''
    }
   this.Auth = new AuthService();
  }



handleLogout(){
    this.Auth.logout();
    this.props.history.replace('/login');
 }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
           <div>
               <Navigation />
                <Switch>
                  <Route path="/todos" component={Note}/>
                  <Route path="/" exact component={Home}/>
                  <Route component={Error} />
                </Switch>

                <p className="App-intro">
                    <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
                </p>
           </div>
        </BrowserRouter>
      </div>

      // <div className="App">
      // <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome {this.props.user.username}</h2>
      // </div>
      // <p className="App-intro">
      //     <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
      // </p>
      // </div>   
    );
  }
}

export default withAuth(App);
