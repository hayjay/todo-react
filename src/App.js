import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Note from './components/Note'; //import Note component
import Error from './components/NotFound';
// navbar import
import Navigation from './components/Navigation';

class App extends Component {
  constructor () {
    super();

    this.state = {
      noteText : '',
      notes : [], //holds array of each note we want to create,
      singleNote : ''
    }
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
           </div>
          
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
