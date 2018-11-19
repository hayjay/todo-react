import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Note from './components/Note'; //import Note component

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
            <Route path="/todos" component={Note}/>
            <Route path="/" exact component={Home}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
